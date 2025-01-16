const express = require('express');
const router = express.Router();


const { read } = require('../Controllers/user.js');

router.get('/:id', read);

module.exports = router;