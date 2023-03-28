const { Router } = require('express');
const { check } = require('express-validator');
const { getUser } = require('../controllers/user/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.get('/:id', [], getUser);

module.exports = router;