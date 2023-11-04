/* 
Ruta base: /api/upload
*/

const { Router } = require('express');
const { subirArchivo, enviarArchivo } = require('../controllers/uploads');
const { check } = require('express-validator');
const router = Router();

router.get('/:nombreArchivo', [
    check('nombreArchivo', 'El nombre archivo debe de ser un nombre válido').trim(),
], enviarArchivo);

router.post('/', [
], subirArchivo);

module.exports = router;