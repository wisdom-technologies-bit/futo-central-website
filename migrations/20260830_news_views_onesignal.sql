-- FUTO Central: additive news view and OneSignal support migration
ALTER TABLE articles ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS notification_sent_at timestamptz;
UPDATE articles SET views = 0 WHERE views IS NULL;
CREATE INDEX IF NOT EXISTS articles_views_idx ON articles (views DESC);
CREATE INDEX IF NOT EXISTS articles_notification_pending_idx ON articles (status, notification_sent_at) WHERE status = 'published';

-- Stores only the OneSignal identifiers and delivery preference needed by the app.
CREATE TABLE IF NOT EXISTS onesignal_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  onesignal_subscription_id text UNIQUE NOT NULL,
  onesignal_user_id text,
  notification_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS onesignal_subscriptions_enabled_idx ON onesignal_subscriptions (notification_enabled);
