const fs = require('fs');
const path = require('path');
const constants = require('../constants');

const { MAX_SIZE_UPLOAD } = constants;

const enviarArchivo = async (req, res) => {

    const nombreArchivo = req.params.nombreArchivo;
    const pathArchivo = path.join(__dirname, '..', '..', 'foro-marvel', 'src', 'assets', 'uploads', nombreArchivo);
    if(!fs.existsSync(pathArchivo)){
        // console.log(`No existe el archivo: ${pathArchivo}`);
        return res.status(400).json({
            ok: false,
            msg: `No se ha encontrado el archivo ${nombreArchivo}.`,
        });
    }
    res.sendFile(pathArchivo);
}

const subirArchivo = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir.'
        });
    }

    if (req.files.files.truncated) {
        return res.status(400).json({
            ok: false,
            msg: `El archivo es demasiado grande, permitido hasta ${MAX_SIZE_UPLOAD}MB`
        });
    }

    const formatosValidos = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'tiff'];

    const archivo = req.files.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    if (!formatosValidos.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: `El tipo de archivo ${extension} no está permitido. Sí permitidos: (${formatosValidos}) `
        });
    }

    // Para identificar las imágenes y hacerlas únicas
    // const timestamp = Date.now();
    // const nuevoNombreArchivo = `${archivo.name.split('.')[0]}_${timestamp}.${extension}`;

    const uploadPath = path.join(__dirname, '..', '..', 'foro-marvel', 'src', 'assets', 'uploads', archivo.name);
    // console.log("uploadPath", uploadPath)
    // Verificar si el archivo ya existe
    if (fs.existsSync(uploadPath)) {
        // Si existe, elimina el archivo existente
        fs.unlinkSync(uploadPath);

    }
    
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
            nombreArchivo: archivo.name,
            timestamp: Date.now()
        });
    });
}

module.exports = { subirArchivo, enviarArchivo }