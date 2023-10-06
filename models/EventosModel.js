const {Schema,model} = require('mongoose')


const EventoSchema = Schema({
    ProgramasAcademicos:{
        type:String
    },
    title:{
        type:String,
    },
    pogramas:{
        type:String,
   },
    list:[{
     listItem:{
        start:{
            type:Number,
            required:true
    
        },
        titleItem:{
            type:String,
          
            
        },
        metas:[{
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
            note:[{
                noteTitle:{
                    type:String
                },
                body:{
                    type:String
                },
                mes:{
                    type:Number
                },
                año:{
                    type:Number
                },
                dia:{
                    type:Number
                },
                file:[{

                }],
            }]
        }] 
     },
    }]


});

module.exports = model('Evento', EventoSchema);