const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/', searchController.read);

module.exports = router;