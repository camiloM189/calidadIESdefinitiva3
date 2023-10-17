const {Schema,model} = require('mongoose')


const UsuarioSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    },
    tipoDeUsuario:{
        type:String

    },
    idUniversidad:{
        type:String
    },
    nombreDeLaUniversidad:{
        type:String

    }



});

module.exports = model('Usuario', UsuarioSchema);