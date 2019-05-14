DROP TABLE IF EXISTS url;

CREATE TABLE url (
  id SERIAL PRIMARY KEY,
  long_url TEXT,
  short_url TEXT,
  clicks INTEGER,
  qr_code TEXT,
  timesCreated INT,
  created_at BIGINT,
);