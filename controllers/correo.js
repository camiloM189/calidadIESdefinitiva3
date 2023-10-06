const {response} = require('express');
const Usuario = require('../models/UsuarioModel');
const { default: mongoose } = require('mongoose');
const express = require('express');
const transporter  = require('../helpers/transporter');
// const { transporter } = require('../helpers/transporter.js');




const ObtenerCorreo = async(req, res = response) => {
      try {
        
     
        const { Nombre,Comentario,Email } = req.body;
      
        const comentario = `Nombre:${Nombre}\nEmail:${Email}\n${Comentario}`
     
        const mailOptions = {
        from: Email,
        to: 'calidadies2023@gmail.com',
        subject:`Mensaje para calidad IES mensaje de ${Email}`,
        text:`Comentario: ${comentario}`
        }
     
         
         await transporter.sendMail(mailOptions);
         res.status(200).json({ message: 'Correo enviado con éxito' });
       } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Error al enviar el correo' });
       }

        

}
module.exports = {ObtenerCorreo}