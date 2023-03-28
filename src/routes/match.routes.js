const { Router } = require('express');
const { check } = require('express-validator');
const { match } = require('../controllers/couples/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

// GUARDA EL USUARIO LIKEADO 
router.post('/:id', [
    check('userId', 'El identificador del usuario es obligatorio.').not().isEmpty()
], match);

module.exports = router;