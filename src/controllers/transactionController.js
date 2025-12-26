const pool = require('../db');

exports.deposit = async (req, res) => {
  const { account_id, amount } = req.body;

  await pool.query(
    `INSERT INTO ledger_entries (account_id, amount, entry_type)
     VALUES ($1,$2,'credit')`,
    [account_id, amount]
  );

  res.json({ message: 'Deposit successful' });
};

exports.withdraw = async (req, res) => {
  const { account_id, amount } = req.body;

  const bal = await pool.query(
    `SELECT COALESCE(SUM(
      CASE WHEN entry_type='credit' THEN amount ELSE -amount END
    ),0) AS balance FROM ledger_entries WHERE account_id=$1`,
    [account_id]
  );

  if (bal.rows[0].balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  await pool.query(
    `INSERT INTO ledger_entries (account_id, amount, entry_type)
     VALUES ($1,$2,'debit')`,
    [account_id, amount]
  );

  res.json({ message: 'Withdrawal successful' });
};

exports.transfer = async (req, res) => {
  const { from_account, to_account, amount } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const bal = await client.query(
      `SELECT COALESCE(SUM(
        CASE WHEN entry_type='credit' THEN amount ELSE -amount END
      ),0) AS balance FROM ledger_entries WHERE account_id=$1`,
      [from_account]
    );

    if (bal.rows[0].balance < amount) {
      throw new Error('Insufficient funds');
    }

    await client.query(
      `INSERT INTO ledger_entries VALUES (uuid_generate_v4(),$1,$2,'debit',NOW())`,
      [from_account, amount]
    );

    await client.query(
      `INSERT INTO ledger_entries VALUES (uuid_generate_v4(),$1,$2,'credit',NOW())`,
      [to_account, amount]
    );

    await client.query('COMMIT');
    res.json({ message: 'Transfer successful' });
  } catch (e) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
};
