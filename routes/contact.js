const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.post('/', contactController.create);

module.exports = router;