const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/pay', authenticateJWT, paymentController.pay);
// router.get('/callback', authenticateJWT, paymentController.verify);

// I had to use this instead for mobile
router.get('/callback', paymentController.verify);

module.exports = router;