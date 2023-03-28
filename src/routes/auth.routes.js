const { Router } = require('express');
const { check } = require('express-validator');
const { register, verifyOtp, login, check: checkToken } = require('../controllers/auth/');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

const router = Router();

// REGISTRA USUARIOS
router.post('/register', [
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    fieldValidator
], register);

// VERIFICA CÓDIGOS OTP DE 6 DÍGITOS PARA REGISTRAR USUARIOS
router.post('/verifyOtp', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    check('otp', 'El código de verificación es obligatorio.').not().isEmpty(),
    fieldValidator
], verifyOtp);

// INCIAR SESIÓN DE USUARIOS
router.post('/login', [
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    fieldValidator
], login);

router.get('/check', tokenValidator, checkToken);

module.exports = router;