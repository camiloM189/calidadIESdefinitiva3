const {Schema,model} = require('mongoose');

const ProyeccionDeEventos =  Schema({ 
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
    idOportunidadDeMejora:{
        type:String
    },
    idActividadesDeMejora:{
        type:String
    },
    indicador:{
        type:String
    },
    fecha1:{
        type:Number,
        required:true
    },
    fecha2:{
        type:Number,
        required:true
    },
    fecha3:{
        type:Number,
        required:true
    },
    fecha4:{
        type:Number,
        required:true
    },
    fecha5:{
        type:Number,
        required:true
    },
    fecha6:{
        type:Number,
        required:true
    },
    fecha7:{
        type:Number,
        required:true
    },
    totalDeProyecciones:{
        type:Number
    },
    notasFecha1:{
        type:Number,
    },
    notasFecha2:{
        type:Number

    },
    notasFecha3:{
        type:Number

    },
    notasFecha4:{
        type:Number

    },
    notasFecha5:{
        type:Number

    },
    notasFecha6:{
        type:Number

    },
    notasFecha7:{
        type:Number

    },
    totalDeNotas:{
        type:Number
    },
    porcentajes:{
        type:String

    },
    idUniversidad:{
        type:String
    }

})
module.exports = model('ProyeccionDeEventos', ProyeccionDeEventos);