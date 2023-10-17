const {Schema,model} = require('mongoose');

const Universidades =  Schema({ 
    nombreDeLaUniversidad:{
        type:String,
        required:true
    },
    usuarios:{
        type:String
    }
    



})
module.exports = model('Universidades', Universidades);