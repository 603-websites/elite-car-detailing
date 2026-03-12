// Send promotional discount offers to past customers
// Targets customers who booked 30-90 days ago and opted into SMS

/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
import {
  sendSMS,
  formatPhoneE164,
  fillTemplate,
  getTemplate,
  generateOfferCode,
} from '../lib/telnyx.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const API_SECRET = process.env.SMS_API_SECRET;
/* eslint-enable no-undef */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API key auth
  const authHeader = req.headers['authorization'];
  if (!API_SECRET || authHeader !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { discount_percent = 15, max_recipients = 10 } = req.body;

    // Validate discount
    if (discount_percent < 5 || discount_percent > 50) {
      return res.status(400).json({ error: 'Discount must be between 5% and 50%' });
    }

    // Find past customers (30-90 days ago) with SMS consent
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data: pastBookings, error } = await supabase
      .from('bookings')
      .select('customer_name, customer_phone, customer_email')
      .eq('sms_consent', true)
      .eq('status', 'completed')
      .gte('appointment_date', ninetyDaysAgo.toISOString().split('T')[0])
      .lte('appointment_date', thirtyDaysAgo.toISOString().split('T')[0])
      .limit(max_recipients);

    if (error) {
      console.error('Error fetching past customers:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!pastBookings || pastBookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No eligible customers found',
        count: 0,
      });
    }

    // Deduplicate by phone number
    const uniquePhones = new Map();
    for (const booking of pastBookings) {
      const digits = booking.customer_phone.replace(/\D/g, '').slice(-10);
      if (!uniquePhones.has(digits)) {
        uniquePhones.set(digits, booking);
      }
    }

    const template = await getTemplate('promo_offer');
    if (!template) {
      return res.status(500).json({ error: 'Promo template not found' });
    }

    let sentCount = 0;

    for (const [, booking] of uniquePhones) {
      const phone = formatPhoneE164(booking.customer_phone);
      const offerCode = generateOfferCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 14);

      // Create offer in database
      await supabase.from('sms_offers').insert({
        phone_number: phone,
        offer_code: offerCode,
        discount_percent,
        expires_at: expiresAt.toISOString(),
      });

      const message = fillTemplate(template, {
        name: booking.customer_name.split(' ')[0],
        discount: discount_percent.toString(),
        offer_code: offerCode,
      });

      const result = await sendSMS(phone, message);
      if (result.success || result.demo) {
        sentCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Sent ${sentCount} promo offers`,
      sent: sentCount,
      total: uniquePhones.size,
    });
  } catch (error) {
    console.error('Promo send error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
