# Financial Ledger API

A simple Financial Ledger API built using double-entry bookkeeping principles.
All balances are calculated from immutable ledger entries.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- pg (raw SQL)

## Features
- Create accounts
- Deposit, withdraw, and transfer funds
- Double-entry transactions (debit & credit)
- ACID-compliant transfers
- No stored balance (derived from ledger)

## Run Project
npm install
npm run dev

Server runs on http://localhost:3000

## API Endpoints
- POST /accounts
- GET /accounts/:id/balance
- POST /transactions/deposit
- POST /transactions/withdraw
- POST /transactions/transfer

## Author
Prasheela Koppala
