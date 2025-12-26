const express = require('express');
const router = express.Router();
const tx = require('../controllers/transactionController');

router.post('/deposit', tx.deposit);
router.post('/withdraw', tx.withdraw);
router.post('/transfer', tx.transfer);

module.exports = router;
