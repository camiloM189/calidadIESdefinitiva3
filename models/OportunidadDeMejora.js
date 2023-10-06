const {Schema,model} = require('mongoose');

const OportunidadDeMejora =  Schema({ 
    uidUsuario:{
        type:String
    },
    idPlanDeMejoramiento:{
        type:String
    },
    programa:{
        type:String
    },
    idPrograma:{
        type:String
    },
    usuario:{
        type:String
    },
    start:{
        type:Number,
        required:true
    },
    OportunidadDeMejoraTitle:{
        type:String,  
    },
    calidadDeContenido:{
        type:String
    }

})
module.exports = model('OportunidadDeMejora', OportunidadDeMejora);

