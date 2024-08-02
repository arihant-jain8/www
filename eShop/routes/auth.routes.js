const express = require('express');
const authConrtoller = require('../controllers/auth.controller');

const router = express.Router();

router.get('/signup', authConrtoller.getSignup);

router.post('/signup', authConrtoller.signup);

router.get('/login', authConrtoller.getLogin);

module.exports = router;