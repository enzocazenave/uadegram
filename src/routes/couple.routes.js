const { Router } = require('express');
const { check } = require('express-validator');
const { match, noMatch, getUsers } = require('../controllers/couples/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

// GUARDA EL USUARIO LIKEADO 
router.post('/match/:id', [
    check('userId', 'El identificador del usuario es obligatorio.').not().isEmpty()
], match);

// GUARDA EL USUARIO NO LIKEADO
router.post('/nomatch/:id', [
    check('userId', 'El identificador del usuario es obligatorio.').not().isEmpty()
], noMatch);

router.get('/users/:gender', [], getUsers);

module.exports = router;