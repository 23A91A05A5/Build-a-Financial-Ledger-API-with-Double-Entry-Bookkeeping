const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.createAccount);
router.get('/:id/balance', accountController.getBalance);

module.exports = router;
