const multer = require('multer');

const fs = require('fs');

const uploadDir = 'uploads/';

// Verifica si la carpeta 'uploads' existe, si no, créala
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define la carpeta de destino para guardar los archivos
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Genera un nombre de archivo único

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });

module.exports = {
    storage
}
 