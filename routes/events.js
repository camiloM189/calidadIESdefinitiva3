const {Router} = require('express');
const { obtenerEventos, crearEventos, actualizarEventos, borrarEventos, obtenerEventosPorId, getItemList, actualizarItemList, getMetas, actualizarMetas, borrarItemList, borrarMetas, getNotas, borrarNotas, uploadFiles, updateNotes, actualizarTitleItemList } = require('../controllers/events');
const { validarToken } = require('../middlewares/validarToken');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarListItem, validarIndicador, validarTitleItem, validarFechaDeInicio, validarFechaDeFinalizacion, validarMetas, validarMetasTitle, validarMetasFechaInicio, validarMetasFechaFinalizacion } = require('../middlewares/validarEventos');
const multer = require('multer');
const { storage } = require('../middlewares/uploadMiddleware');

const upload = multer({ storage: storage });

const router = Router()

router.use(validarToken)

// router.put('/',obtenerEventos)

router.get('/',obtenerEventos)

router.get('/:id',obtenerEventosPorId)

router.put('/item/:pagina/:id',actualizarItemList)

router.put('/item/:pagina/:id/edit',actualizarTitleItemList)

router.delete('/item/:pagina/:id',borrarItemList)

router.get('/item/:pagina/:id/:_id',getMetas)

router.put('/item/:pagina/:id/:_id',actualizarMetas)

router.delete('/item/:pagina/:id/:_id',borrarMetas)

router.get(`/item/:pagina/:id`,getItemList)

router.get('/item/:pagina/:id/:_id/:noteId',getNotas)

router.put('/item/:pagina/:id/:_id/:noteId',updateNotes)

router.delete('/item/:pagina/:id/:_id/:noteId',borrarNotas)

router.post('/upload',upload.single('file'),uploadFiles);

// router.put('/upload/generate',generateDownloadLink);


router.post('/' ,[
        // check('title','El titulo es obligatorio').not().isEmpty(),
        // validarCampos,

        // check('list','es necesario que tenga minimo una accion a cumplir').not().isEmpty(),
        // validarCampos,

        // check('listItem','Tiene que tener euna oportunidad de mejora').not().isEmpty(),
        // // validarListItem,
        // validarCampos,
        // check('start','Es necesario una fecha de inicio').not().isEmpty(),
        // // validarFechaDeInicio,
        // validarCampos,
        // check('indicador','Es necesario que el indicador').not().isEmpty(),
        // // validarIndicador,
        // validarCampos,
        // check('titleItem','Es necesario que titleItem tenga titulo').not().isEmpty(),
        // // validarTitleItem,
        // validarCampos,
        // check('end','Es necesario que tenga una fecha de finalizacion').not().isEmpty(),
        // // validarFechaDeFinalizacion,
        // validarCampos,
        // check('metas','Es necesario que tenga una meta').not().isEmpty(),
        // // validarMetas,
        // validarCampos,
        // check('metasTitle','Es necesario que tenga un titulo').not().isEmpty(),
        // // validarMetasTitle,
        // validarCampos,
        // check('metasStart','Es necesario que las metas tengan una fecha').not().isEmpty(),
        // // validarMetasFechaInicio,
        // validarCampos,
        // check('metasEnd','Es necesario que las metas tengan una fecha de finalizacion').not().isEmpty(),
        // // validarMetasFechaFinalizacion,
        // validarCampos,
],
crearEventos)

router.put('/:id',actualizarEventos)

router.delete('/:id',borrarEventos)



module.exports = router;