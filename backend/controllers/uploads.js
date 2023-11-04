const fs = require('fs');
const path = require('path');


const subirArchivo = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir.'
        });
    }

    // const id = req.params.id;

    const formatosValidos = ['png', 'jpg', 'jpeg'];

    const archivo = req.files.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!formatosValidos.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: `El tipo de archivo ${extension} no está permitido. Sí permitidos: (${formatosValidos}) `
        });
    }

    const uploadPath = path.join(__dirname, '..', '..', 'foro-marvel', 'src', 'assets', 'uploads', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo.'
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido correctamente.',
            nombreArchivo: archivo.name
        });
    });
}

const enviarArchivo = async (req, res) => {}

module.exports = { subirArchivo, enviarArchivo }