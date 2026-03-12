// Inbound SMS webhook handler
// Receives messages from Telnyx, parses intent, and routes conversation

/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
import {
  sendSMS,
  logMessage,
  verifyWebhookSignature,
  formatPhoneE164,
  fillTemplate,
  getTemplate,
  generateOfferCode,
} from '../lib/telnyx.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
/* eslint-enable no-undef */

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook signature
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  try {
    const event = req.body;

    // Telnyx sends events in this structure
    const eventData = event.data;
    const eventType = eventData?.event_type;

    // We only care about inbound messages
    if (eventType !== 'message.received') {
      return res.status(200).json({ status: 'ignored', event_type: eventType });
    }

    const payload = eventData.payload;
    const fromNumber = payload.from?.phone_number;
    const messageText = payload.text?.trim() || '';
    const telnyxMessageId = payload.id;

    if (!fromNumber || !messageText) {
      return res.status(200).json({ status: 'empty_message' });
    }

    // Log inbound message
    await logMessage({
      phone_number: fromNumber,
      direction: 'inbound',
      message_text: messageText,
      telnyx_message_id: telnyxMessageId,
      status: 'received',
    });

    // Parse intent from message
    const intent = parseIntent(messageText);

    // Find the customer's upcoming booking
    const booking = await findUpcomingBooking(fromNumber);

    // Route based on intent
    let replyTemplate;
    let replyVars = {};

    switch (intent) {
      case 'confirm':
        replyTemplate = await getTemplate('confirm_reply');
        if (booking) {
          await supabase
            .from('bookings')
            .update({ status: 'confirmed' })
            .eq('id', booking.id);
        }
        break;

      case 'reschedule':
        replyTemplate = await getTemplate('reschedule_reply');
        break;

      case 'cancel':
        // Generate a discount offer
        const offerCode = generateOfferCode();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await supabase.from('sms_offers').insert({
          phone_number: fromNumber,
          offer_code: offerCode,
          discount_percent: 10,
          expires_at: expiresAt.toISOString(),
        });

        if (booking) {
          await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', booking.id);
        }

        replyTemplate = await getTemplate('cancel_reply');
        replyVars = { offer_code: offerCode };
        break;

      default:
        replyTemplate = await getTemplate('fallback');
        break;
    }

    // Send reply
    if (replyTemplate) {
      const replyText = fillTemplate(replyTemplate, replyVars);
      await sendSMS(fromNumber, replyText, booking?.id);
    }

    return res.status(200).json({ status: 'processed', intent });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Parse user intent from SMS text
 * @param {string} text - Raw message text
 * @returns {string} - Intent: 'confirm', 'reschedule', 'cancel', or 'unknown'
 */
function parseIntent(text) {
  const lower = text.toLowerCase().trim();

  if (/^(confirm|yes|y|ok|confirmed|see you|sounds good)$/i.test(lower) || lower.includes('confirm')) {
    return 'confirm';
  }

  if (/^(reschedule|change|move|different time|new time)$/i.test(lower) || lower.includes('reschedule')) {
    return 'reschedule';
  }

  if (/^(cancel|no|n|nevermind|cancel it)$/i.test(lower) || lower.includes('cancel')) {
    return 'cancel';
  }

  return 'unknown';
}

/**
 * Find the customer's next upcoming booking by phone number
 * @param {string} phoneNumber - E.164 phone number
 * @returns {Promise<Object|null>} - Booking data or null
 */
async function findUpcomingBooking(phoneNumber) {
  // Strip +1 prefix and try various formats
  const digits = phoneNumber.replace(/\D/g, '');
  const last10 = digits.slice(-10);

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('appointment_date', today)
    .or(`customer_phone.like.%${last10}%`)
    .order('appointment_date', { ascending: true })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}
