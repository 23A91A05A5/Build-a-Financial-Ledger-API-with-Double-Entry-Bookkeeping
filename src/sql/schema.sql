CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id),
  amount NUMERIC(18,2) NOT NULL,
  entry_type VARCHAR(10) CHECK (entry_type IN ('debit', 'credit')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
