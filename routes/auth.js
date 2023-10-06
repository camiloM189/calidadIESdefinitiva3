//Rutas de usuarios 
// host + /api/auth
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator')
const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarToken } = require('../middlewares/validarToken');


router.post('/new',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({min:6}),
    validarCampos
],crearUsuario);


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({min:6}),
    validarCampos
], loginUsuario);



router.get('/renew',validarToken,revalidarToken);


module.exports = router;
