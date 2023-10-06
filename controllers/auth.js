const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/UsuarioModel');
const {generarJWT} = require('../helpers/jwt');
const { default: mongoose } = require('mongoose');

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
module.exports = {crearUsuario,loginUsuario,revalidarToken}