/*
Todo lo que llega aqui viene de /api/characters
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getCharacters, getCharactersById, createCharacters, updateCharacters, deleteCharacters } = require('../controllers/character');

const router = Router();

router.get('/', [
], getCharacters);

router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
], getCharactersById);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
], createCharacters);

router.put('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
], updateCharacters);

router.delete('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
], deleteCharacters);

module.exports = router;