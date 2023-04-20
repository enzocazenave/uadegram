const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, addImages, answerQuestions } = require('../controllers/user/');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

// DEVUELVE EL USUARIO OBTENIDO MEDIANTE :id
router.get('/:id', [], getUser);

// SUBE IMAGENES A CLOUDINARY Y LAS GUARDA EN EL ARRAY DE FOTOS DE CADA USUARIO
router.post('/image/:id', [], addImages);

// PERMITE FILLEAR CAMPOS COMO BIRTHDATE, GENDER, CAREER
router.post('/answer/:id', [
    check('birthdate', 'La fecha de nacimiento es obligatoria.').isDate(),
    check('gender', 'El género es obligatorio').isNumeric(),
    check('career', 'La carrera universitaria es obligatoria').isNumeric()
], answerQuestions);

module.exports = router;