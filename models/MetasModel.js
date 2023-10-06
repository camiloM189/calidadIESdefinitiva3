const {Schema,model} = require('mongoose');

const MetasModel =  Schema({ 
    uidUsuario:{
        type:String

    },
    idPrograma:{
        type:String

    },
    itemListId:{
        type:String

    },
    indicador:{
        type:String,
      
    },
    metaTitle:{
        type:String
    },
    fecha:{
        type:String

    },
    fecha2:{
        type:String
        
    },
    fecha3:{
        type:String
        
    },
    fecha4:{
        type:String
        
    },
    fecha5:{
        type:String
        
    },
    fecha6:{
        type:String
        
    },
    fecha7:{
        type:String
        
    },
    total:{
        type:Number
    },
    totalNota:{
        type:Number
    },




})
module.exports = model('MetasModel', MetasModel);
