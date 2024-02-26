const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes cambiarlo según tu proveedor de correo
  auth: {
    user: 'calidadies2023@gmail.com', // Tu dirección de correo electrónico
    pass: 'tsmg ekta xbgc yslc' // Tu contraseña (o una contraseña de aplicación si utilizas Gmail)
  }
});

module.exports = transporter;
