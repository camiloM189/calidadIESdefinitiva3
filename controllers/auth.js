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
      
}
const enviarCodigo = async(req,res = response) => {
    try {
        const {email,password,name,codigo} = req.body;
        const mailOptions = {
            from: email,
            to: email,
            subject:`Codigo de verificacion de Calidad IES`,
            text:`Hola ${name} El codigo de verificacion de tu cuenta de Calidad IES es :${codigo}`,
            html:`
            <html>
            <head>
                <style>
                body {
                    background-color: #f4f4f4;
                }
                p{
                    font-size: 1.2rem;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .header {
                    background-color: #1b2543;
                    color: #fff;
                    padding: 10px;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .image {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 20px auto;
                }
                </style>
            </head>
            <body>
            <div class="container">
            <div class="header">
                <h2>Código de verificación de Calidad IES</h2>
            </div>
            <div class="content">
                <p>Hola ${name}</p>
                <p>Calidad IES ha recibido una solicitud de creación de usuario</p>
                <p>Utiliza este código para continuar con el proceso de creación de usuario</p>
                <p>El código de verificación de tu cuenta de Calidad IES es: ${codigo}</p>
            </div>
           </div>
            </body>
            </html>
        `
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
          
          const token = await generarJWT(usuario.id,usuario.name,usuario.idUniversidad);
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            idUniversidad:usuario.idUniversidad,
            tipoDeUsuario:usuario.tipoDeUsuario,

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
        const token = await generarJWT(usuario.id,usuario.name,usuario.idUniversidad);
   
        res.json({
        ok:true,
        msg:'login',
        uid:usuario.id,
        name:usuario.name,
        tipoDeUsuario:usuario.tipoDeUsuario,
        idUniversidad:usuario.idUniversidad,
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
const obtenerIdUniversidad = async(req,res = response) => {
    try {
        const {uid} = req.body;
        let usuario = await Usuario.find({_id:uid});
        const {idUniversidad,tipoDeUsuario} = usuario[0]

        res.json({
            ok:true,
            idUniversidad,
            tipoDeUsuario
        })



    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por Favor hable con el admin'
        })
    }
   



 
}



module.exports = {crearUsuario,loginUsuario,revalidarToken,comprobarEmail,enviarCodigo,obtenerIdUniversidad}
