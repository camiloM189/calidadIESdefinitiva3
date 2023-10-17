const {Schema,model} = require('mongoose');

const Notas =  Schema({ 
    titulosDeNotas:{
        type:String
    },
    bodyDeNotas:{
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
  
    },
    mes:{
        type:Number

    },
    dia:{
        type:Number
    },
    idOportunidadDeMejora:{
        type:String
    },
    idActividadesDeMejora:{
        type:String
    },
    idProyeccionDeEventos:{
        type:String
    },
    numeroDeNotas:{
        type:Number
    },
    seguimiento:{
        type:Number
    },
    yearSeguimiento:{
        type:Number
    },
    idUniversidad:{
        type:String
    }

})
module.exports = model('Notas', Notas);