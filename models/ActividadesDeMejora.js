const { Schema, model } = require("mongoose");

const ActividadesDeMejora =  Schema({ 
    tituloDeActividades:{
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
    calidadDeContenido:{
        type:String
    },
    idOportunidadDeMejora:{
        type:String
    },
    idUniversidad:{
        type:String
    }

})
module.exports = model('ActividadesDeMejora',ActividadesDeMejora);