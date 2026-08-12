const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { loginSchema, registerSchema } = require('../schemas/authSchema');
const { authLogin, authRegister } = require('../controllers/authController');

router.post('/login', validate(loginSchema), authLogin);
router.post('/register', validate(registerSchema), authRegister);

module.exports = router;