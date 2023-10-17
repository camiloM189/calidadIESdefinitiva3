const {Schema,model} = require('mongoose');

const SubirFiles =  Schema({ 
   cloudResp:{
    

   },
   public_id:{

   },
   idNota:{

   },
   idPlanDeMejoramiento:{

   },
   idPrograma:{

   },
   idOportunidadDeMejora:{

   },
   idActividadesDeMejora:{

   },
   idProyeccionDeEventos:{

   },
   idUniversidad:{
      type:String
  }

})
module.exports = model('SubirFiles', SubirFiles);