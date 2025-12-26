const pool = require('../db');

exports.createAccount = async (req, res) => {
  const { user_name, account_type, currency } = req.body;

  if (!user_name || !account_type || !currency) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const result = await pool.query(
    `INSERT INTO accounts (user_name, account_type, currency)
     VALUES ($1,$2,$3) RETURNING *`,
    [user_name, account_type, currency]
  );

  res.json(result.rows[0]);
};

exports.getBalance = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT COALESCE(SUM(
      CASE WHEN entry_type='credit' THEN amount ELSE -amount END
    ),0) AS balance
     FROM ledger_entries WHERE account_id=$1`,
    [id]
  );

  res.json(result.rows[0]);
};
