const {Schema,model} = require('mongoose');

const EnviarCorreo =  Schema({ 
    Nombre:{
        type:String

    },
    Email:{
        type:String,
        required:true

    },
    Comentarios:{
        type:String

    },




})
module.exports = model('EnviarCorreo', EnviarCorreo);
