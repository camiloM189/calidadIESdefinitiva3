const mongoose = require('mongoose')
const crypto = require('crypto');

const dbConnection = async() => {

    // const apiSecret = "YYKxZcFtFxte6TirX2gJA5ZDK_0";
    // const timestamp = Math.floor(Date.now() / 1000);
    // const upload_preset = 'calidadies-react';
    // const stringToSign = `timestamp=${timestamp}${apiSecret}`;
    // const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
    
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Db Online');
        // console.log(signature);
        // console.log(timestamp);

        
    } catch (error) {
        console.log(error);
        throw new Error('Erro a la hora de inicializar la base de datos')

    }
}

module.exports = {
    dbConnection
}