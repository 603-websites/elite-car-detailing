// Outbound SMS sender endpoint
// Used to send ad-hoc messages to customers

/* eslint-disable no-undef */
import { sendSMS, formatPhoneE164 } from '../lib/telnyx.js';

const API_SECRET = process.env.SMS_API_SECRET;
/* eslint-enable no-undef */

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple API key auth for internal use
  const authHeader = req.headers['authorization'];
  if (!API_SECRET || authHeader !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { to, message, booking_id } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required fields: to, message' });
    }

    if (message.length > 1600) {
      return res.status(400).json({ error: 'Message too long (max 1600 characters)' });
    }

    const formattedPhone = formatPhoneE164(to);
    const result = await sendSMS(formattedPhone, message, booking_id || null);

    if (result.success) {
      return res.status(200).json({ success: true, message_id: result.data?.id });
    }

    if (result.demo) {
      return res.status(200).json({ success: true, demo: true, message: 'Telnyx not configured' });
    }

    return res.status(500).json({ success: false, error: result.error });
  } catch (error) {
    console.error('SMS send error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
