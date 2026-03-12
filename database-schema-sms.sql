-- SMS Chatbot System - Supabase Schema Migration
-- Run this AFTER the base database-schema.sql

-- Add SMS consent fields to bookings table
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS sms_consent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sms_reminder_sent BOOLEAN DEFAULT false;

-- SMS Conversations - logs all inbound/outbound messages
CREATE TABLE IF NOT EXISTS sms_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  phone_number VARCHAR(20) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_text TEXT NOT NULL,
  telnyx_message_id VARCHAR(100),
  booking_id UUID REFERENCES bookings(id),
  status VARCHAR(20) DEFAULT 'delivered' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'received'))
);

CREATE INDEX IF NOT EXISTS idx_sms_conversations_phone ON sms_conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_sms_conversations_booking ON sms_conversations(booking_id);
CREATE INDEX IF NOT EXISTS idx_sms_conversations_created ON sms_conversations(created_at);

-- SMS Templates - predefined message templates
CREATE TABLE IF NOT EXISTS sms_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  name VARCHAR(100) NOT NULL UNIQUE,
  template_text TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('reminder', 'confirmation', 'promo', 'reschedule', 'cancellation'))
);

-- Insert default templates
INSERT INTO sms_templates (name, template_text, type) VALUES
  ('booking_confirmation', 'Hi {name}! Your Elite Detailing appointment is confirmed for {date} at {time}. Reply CONFIRM to acknowledge or RESCHEDULE to change. Questions? Call 603-275-7513', 'confirmation'),
  ('reminder_24hr', 'Reminder: Your Elite Detailing appointment is tomorrow, {date} at {time}. Reply CONFIRM, RESCHEDULE, or CANCEL. See you soon!', 'reminder'),
  ('confirm_reply', 'Great, see you tomorrow! Please arrive 5-10 minutes early. If anything changes, just text us back.', 'confirmation'),
  ('reschedule_reply', 'No problem! Book a new time at https://elite-detailing-website.vercel.app/booking or call us at 603-275-7513.', 'reschedule'),
  ('cancel_reply', 'Sorry to hear that! Here''s 10% off your next service: {offer_code}. Book anytime at https://elite-detailing-website.vercel.app/booking', 'cancellation'),
  ('promo_offer', 'Hey {name}! It''s been a while since your last detail. Here''s {discount}% off your next service with code {offer_code}. Book now: https://elite-detailing-website.vercel.app/booking', 'promo'),
  ('fallback', 'Thanks for reaching out! For scheduling or questions, please call us at 603-275-7513 or visit https://elite-detailing-website.vercel.app/booking', 'confirmation')
ON CONFLICT (name) DO NOTHING;

-- SMS Offers - discount codes sent via SMS
CREATE TABLE IF NOT EXISTS sms_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  phone_number VARCHAR(20) NOT NULL,
  offer_code VARCHAR(20) NOT NULL UNIQUE,
  discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 50),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_sms_offers_phone ON sms_offers(phone_number);
CREATE INDEX IF NOT EXISTS idx_sms_offers_code ON sms_offers(offer_code);

-- Enable Row Level Security
ALTER TABLE sms_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_offers ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (for API routes)
CREATE POLICY "Service role full access" ON sms_conversations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON sms_templates
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON sms_offers
  FOR ALL USING (true) WITH CHECK (true);
