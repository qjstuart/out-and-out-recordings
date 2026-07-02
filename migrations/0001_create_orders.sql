CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'paid', 'payment_failed', 'expired', 'refunded')
  ),
  stripe_product_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_total INTEGER NOT NULL CHECK (amount_total >= 0),
  currency TEXT NOT NULL,
  customer_email TEXT,
  download_url TEXT,
  download_url_expires_at INTEGER,
  delivery_email_sent_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  paid_at INTEGER
);

CREATE INDEX orders_stripe_payment_intent_id_idx
  ON orders (stripe_payment_intent_id);
