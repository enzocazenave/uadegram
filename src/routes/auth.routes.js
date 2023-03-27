const { Router } = require('express');
const { check } = require('express-validator');
const { register, verifyOtp, login } = require('../controllers/auth/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.post('/register', [
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    fieldValidator
], register);

router.post('/verifyOtp', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    check('otp', 'El código de verificación es obligatorio.').not().isEmpty(),
    fieldValidator
], verifyOtp);

router.post('/login', [
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    fieldValidator
], login);

module.exports = router;