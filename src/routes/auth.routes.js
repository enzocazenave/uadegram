const { Router } = require('express');
const { register, verifyOtp } = require('../controllers/auth/');

const router = Router();

router.post('/register', [], register);
router.get('/verifyOtp', [], verifyOtp);

module.exports = router;