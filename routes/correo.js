const { ObtenerCorreo } = require("../controllers/correo");
const {Router} = require('express');

const router = Router()

router.post('/EnviarCorreo',ObtenerCorreo);




module.exports = router;
