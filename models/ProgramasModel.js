const {Schema,model} = require('mongoose');

const ProgramasSchema =  Schema({ 
    uidUsuario:{
        type:String
    },
    usuario:{
        type:String
    },
    Programa:{
        type:String
    }
})
module.exports = model('Programa', ProgramasSchema);

