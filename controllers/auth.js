const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/UsuarioModel');
const {generarJWT} = require('../helpers/jwt');
const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const transporter = require('../helpers/transporter');




const comprobarEmail = async(req,res = response) => {
    try {
        const {email} = req.body;
        let usuario = await mongoose.model('Usuario').findOne({ email });


        if (usuario) {
            return res.status(400).json({
              ok: false,
              msg: 'Un usuario ya existe con ese correo',
            });
          
          }
          const codigo =  uuidv4().slice(0, 4);
       
          res.json({
              ok: true,
              codigo
          })
        }
          catch (error) {
        
          }

        // Verificar si el usuario ya existe en la base de datos 
        // Generar un código único
      
}
const enviarCodigo = async(req,res = response) => {
    try {
        const {email,password,name,codigo} = req.body;

        const mailOptions = {
            from: email,
            to: email,
            subject:`Codigo de verificacion de Calidad IES`,
            text:`Hola ${name} El codigo de verificacion de tu cuenta de Calidad IES es :${codigo}`
            }
            await transporter.sendMail(mailOptions);
         return res.status(200).json({ message: 'Correo enviado con éxito' });
       } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Error al enviar el correo' });
       }


}
const crearUsuario = async(req,res = response) => {
     const {email,password} = req.body;

    try {
        let usuario = await mongoose.model('Usuario').findOne({email})

      
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario ya existe con ese correo'
            });
        }
          usuario = new Usuario(req.body);
          const salt = bcrypt.genSaltSync();
          usuario.password = bcrypt.hashSync(password,salt);
          await usuario.save();
          const token = await generarJWT(usuario.id,usuario.name);
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token

        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Un usuario ya existe con ese correo'
        })
    }
}
const loginUsuario = async(req,res = response) => {
    const {email,password} = req.body;
   
    try {
        let usuario = await mongoose.model('Usuario').findOne({email})
        // const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El email no existe'
            });
        }
        const validarPassword = bcrypt.compareSync(password,usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg:'Credenciales Incorrectas'
            });
        }
        const token = await generarJWT(usuario.id,usuario.name);
        console.log(usuario);
        res.json({
        ok:true,
        msg:'login',
        uid:usuario.id,
        name:usuario.name,
        token
    })  
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por Favor hable con el admin'
        })
    }
}
const revalidarToken = async(req,res = response) => {
    const uid = req.uid;
    const name = req.name;
    const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        token,
        name,
        uid

    })
}
module.exports = {crearUsuario,loginUsuario,revalidarToken,comprobarEmail,enviarCodigo}