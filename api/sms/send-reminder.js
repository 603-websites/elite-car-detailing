// Cron job: Send appointment reminders 24 hours before
// Configured in vercel.json to run daily at 10 AM ET

/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
import { sendSMS, formatPhoneE164, fillTemplate, getTemplate } from '../lib/telnyx.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
/* eslint-enable no-undef */

export default async function handler(req, res) {
  // Accept GET (for cron) and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Find bookings for tomorrow that have SMS consent and haven't been reminded
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('appointment_date', tomorrowStr)
      .eq('sms_consent', true)
      .eq('sms_reminder_sent', false)
      .in('status', ['pending', 'confirmed']);

    if (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No reminders to send',
        count: 0,
      });
    }

    // Get the reminder template
    const template = await getTemplate('reminder_24hr');
    if (!template) {
      return res.status(500).json({ error: 'Reminder template not found' });
    }

    let sentCount = 0;
    let failCount = 0;

    for (const booking of bookings) {
      const phone = formatPhoneE164(booking.customer_phone);
      const dateFormatted = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const message = fillTemplate(template, {
        name: booking.customer_name.split(' ')[0],
        date: dateFormatted,
        time: booking.appointment_time,
      });

      const result = await sendSMS(phone, message, booking.id);

      if (result.success || result.demo) {
        // Mark as reminded
        await supabase
          .from('bookings')
          .update({ sms_reminder_sent: true })
          .eq('id', booking.id);
        sentCount++;
      } else {
        failCount++;
        console.error(`Failed to send reminder to ${booking.customer_name}:`, result.error);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Sent ${sentCount} reminders, ${failCount} failed`,
      sent: sentCount,
      failed: failCount,
      total: bookings.length,
    });
  } catch (error) {
    console.error('Reminder cron error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
