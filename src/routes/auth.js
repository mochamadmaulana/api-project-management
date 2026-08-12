const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { loginSchema } = require('../schemas/authSchema');
// const { authLogin } = require('../controllers/authController');

// router.post('/login', validate(loginSchema), authLogin);

module.exports = router;