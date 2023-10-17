const {Schema,model} = require('mongoose');

const PlanDeMejoramiento =  Schema({ 
    uidUsuario:{
        type:String
    },
    idPrograma:{
        type:String
    },
    usuario:{
        type:String
    },
    tituloDePlanDeMejoramiento:{
        type:String
    },
    start:{
        type:Number,
        required:true
    },
    idUniversidad:{
        type:String
    }
})
module.exports = model('PlanDeMejoramiento', PlanDeMejoramiento);