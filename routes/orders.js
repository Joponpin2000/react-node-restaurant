const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const { authenticateJWT, authenticateAdmin } = require('../middlewares/authenticator');

router.get('/', authenticateJWT, authenticateAdmin, ordersController.readAll);
router.delete('/:id', authenticateJWT, authenticateAdmin, ordersController.delete);

module.exports = router;