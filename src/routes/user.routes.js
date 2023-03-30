const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, addImages } = require('../controllers/user/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

// DEVUELVE EL USUARIO OBTENIDO MEDIANTE :id
router.get('/:id', [], getUser);

/*
SUBE IMAGENES A CLOUDINARY Y LAS GUARDA EN 
EL ARRAY DE FOTOS DE CADA USUARIO
*/
router.post('/image/:id', [
    check('images', 'No estas queriendo subir ninguna imagen.').isArray()
], addImages);

module.exports = router;