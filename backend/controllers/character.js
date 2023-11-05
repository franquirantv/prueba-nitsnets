const db = require('../db/connectionSQLite');

const getCharacters = async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const nameStartsWith = req.query.nameStartsWith || '';
    let total = 0;
    
    try {
        const match = nameStartsWith + '%';

        // Obtener el total de personajes que coinciden con el filtro
        total = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as total FROM Character WHERE name LIKE ?', [match], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows[0].total);
                }
            });
        });

        // Obtener los personajes limitados y paginados
        const sql = 'SELECT * FROM Character WHERE name LIKE ? LIMIT ? OFFSET ?;';
        db.all(sql, [match, limit, offset], (error, rows) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    msg: error.message || "Error al obtener el personaje"
                });
            }
            if (rows.length < 1) {
                return res.status(200).json({
                    ok: true,
                    msg: 'No hay personajes',
                    character: []
                });
            }
            res.status(200).json({
                ok: true,
                msg: 'Acción realizada con éxito.',
                total: total,
                character: rows
            });
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message || "Error al obtener el personaje"
        });
    }
}


const getCharactersById = async (req, res) => {
    try {
        sql = `SELECT * FROM Character WHERE id = ?`;
        const id = req.params.id;
        
        db.get(sql, [id], (error, row) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    msg: error.message || 'Error al obtener el personaje'
                });
            }
            //Si el id no se encuentra en la db, devolver un status 400
            const existeUsuario = row === undefined ? false : true;
            if (existeUsuario === false) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El id no coincide con ningún personaje'
                });
            }
            res.status(200).json({ 
                ok: true,
                msg: 'Acción realizada con éxito.',
                row
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error al obtener el personaje'
        });
    }
}

const createCharacters = async (req, res) => {
    try {
        // Formatos de imagen válidos
        const { name, description } = req.body;
        let { thumbnail } = req.body;
        var extension = thumbnail.split('.')[1];

        if (thumbnail.length < 1 || thumbnail == "") {
            thumbnail = 'no-image.png';
        } else if (extension == "" || extension == undefined || extension != 'jpg' && extension != 'png' && extension != 'jpeg' && extension != 'webp'){
            return res.status(400).json({
                ok: false,
                msg: "El formato de la imagen no es válido",
            });
        }
        
        //obtener la fecha actual
        const modified = new Date().toISOString();
        sql = `INSERT INTO Character(name, description, thumbnail, modified) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, description, thumbnail, modified], function (error, row) {
            if (error){
                return res.status(400).json({
                    ok: false,
                    msg: error.message || "Error al crear el personaje",
                });
            } 
            res.status(201).json({ 
                ok: true,
                msg: 'Personaje creado con éxito.',
                character: {
                    id: this.lastID,
                    name,
                    description,
                    thumbnail,
                    modified
                }
            });
            console.log(`successful input: ${name}, ${description}`);
        });

        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message || "Error al crear el personaje",
        });
    }
}

const updateCharacters = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, description} = req.body;
        let { thumbnail } = req.body;
        const modified = new Date().toISOString();
        let extension;
        console.log('thumbnail: ', thumbnail);
        
        if (thumbnail === undefined || thumbnail === null || thumbnail === "") {
            console.log('thumbnail: ', thumbnail);
            thumbnail = 'no-image.png';
        }

        extension = thumbnail.split('.')[1];
        console.log('thumbnail: ', thumbnail);
        console.log('extension: ', extension);
        if (extension == "" || extension == undefined || extension != 'jpg' && extension != 'png' && extension != 'jpeg' && extension != 'webp'){
            return res.status(400).json({
                ok: false,
                msg: "El formato de la imagen no es válido",
            });
        }
        sql = `UPDATE Character SET name = ?, description = ?, thumbnail = ?, modified = ? WHERE id = ?`;
        db.run(sql, [name, description, thumbnail, modified, id], function (error) {
            if (error){
                return res.status(400).json({
                    ok: false,
                    msg: error.message || 'Error al actualizar el personaje'
                });
            } 

            res.status(200).json({ 
                ok: true,
                msg: 'Personaje actualizado con éxito.',
                character: {
                    id,
                    name,
                    description,
                    thumbnail,
                    modified
                }
            });

            console.log(`successful update ${id}`);
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message || 'Error al actualizar el personaje'
        });
    }
}

const deleteCharacters = async (req, res) => {
    try {
        
        const id = req.params.id;

        sql = `DELETE FROM Character WHERE id = ?`;
        db.run(sql, [id], function (error) {
            if (error){
                return res.status(400).json({
                    ok: false,
                    msg: error.message || 'Error al eliminar el personaje'
                });
            }
            const existeUsuario = this.changes === 0 ? false : true;
            console.log('existeuser: ',existeUsuario);
            if (existeUsuario === false) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El id no coincide con ningún personaje'
                });
            }
            res.status(200).json({ 
                ok: true,
                msg: 'Personaje eliminado con éxito.',
                id: id
            });
            
            console.log(`successful delete ${id}`);
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message || 'Error al eliminar el personaje'
        });
    }
}

module.exports = { getCharacters, getCharactersById, createCharacters, updateCharacters, deleteCharacters };