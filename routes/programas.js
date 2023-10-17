const {Router} = require('express');
const { validarToken } = require('../middlewares/validarToken');
const multer = require('multer');
const { storage } = require('../middlewares/uploadMiddleware');
const {obtenerPrograma, crearPrograma,obtenerProgramasId, obtenerOportunidadDeMejoraPorId,
     crearOportunidadDeMejora, crearPLanDeMejoramiento, obtenerPlanDeMejoramiento, 
     borrarPrograma, crearActividadesDeMejora, borrarPlanDeMejoramiento,
      crearProyeccionDeEventos, obtenerProyeccionDeEventos, obtenerActividadefiltrada,
       obtenerActividadesDeMejora,actualizarOportunidadDeMejora, 
       actualizarActividadeDeOportunidadDeMejora, borrarOportunidadDeMejora, 
       crearNotas, obtenerNotas, obtenerSetNota, actualizarNota, borrarNota, uploadFiles, saveFiles, obtenerFiles, deleteProyeccionDeEventos, borrarFileDeCloudinary, borrarSubirFiles, borrarUnFile, actualizarUnaActividadDeMejoras, obtenerFilesConProyeccionDeEventos, obtenerFilesConIdActividadesDeMejora, borrarActividadDeMejora, obtenerFilesIdOportunidadDeMejora, obtenerFilesIdPlanDeMejoramiento, obtenerFilesIdPrograma, agregarNotas, AgregarNotasFechas, quitarNotasFechas, crearUniversidad, agregarUsuarioUniversidad, obtenerTodasUniversidades, obtenerUsuarios } = require('../controllers/programa');
const { body } = require('express-validator');

const upload = multer({ storage: storage });

const router = Router()

router.use(validarToken)

router.post('/programas',obtenerPrograma)

router.post('/obtenerProgramasId',obtenerProgramasId)

router.post('/crear',crearPrograma)

router.delete('/delete/:idPrograma',borrarPrograma)

router.post('/crearOportunidadDeMejora',crearOportunidadDeMejora)

router.post('/actualizarOportunidadDeMejora',actualizarOportunidadDeMejora)

router.delete('/borrarOportunidadDeMejora/:idOportunidadDeMejora',borrarOportunidadDeMejora)

router.post('/obtenerOportunidadDeMejoraPorId',obtenerOportunidadDeMejoraPorId)

router.post('/crearPlanDeMejoramiento',crearPLanDeMejoramiento)

router.post('/obtenerPLanDeMejoramiento',obtenerPlanDeMejoramiento)

router.post('/crearActividadesDeMejora',crearActividadesDeMejora)

router.post('/actualizarActividadeDeOportunidadDeMejora',actualizarActividadeDeOportunidadDeMejora)

router.post('/obtenerActividadesDeMejora',obtenerActividadesDeMejora)

router.delete('/delete/:idPrograma/:idPlanDeMejoramiento',borrarPlanDeMejoramiento)

router.post('/obtenerActividadefiltrada',obtenerActividadefiltrada)

router.post('/crearProyeccionDeEventos',crearProyeccionDeEventos)

router.post('/obtenerProyeccionDeEventos',obtenerProyeccionDeEventos)

router.post('/obtenerFilesConProyeccionDeEventos',obtenerFilesConProyeccionDeEventos)

router.post('/crearNotas',crearNotas)

router.post('/obtenerNotas',obtenerNotas)

router.post('/obtenerSetNota',obtenerSetNota)

router.post('/actualizarNota',actualizarNota)

router.delete('/borrarNota/:idNota',borrarNota)

// router.post('/uploadFiles',uploadFiles)

router.post('/upload',upload.single('file'),uploadFiles);

router.post('/saveFiles',saveFiles);

router.post('/obtenerFiles',obtenerFiles);

// router.delete('/delete/borrarProyeccionDeEventos/:idProyeccionDeEventos',deleteProyeccionDeEventos);
router.post('/delete/borrarProyeccionDeEventos',deleteProyeccionDeEventos);

router.post('/delete/borrarFileDeCloudinary',borrarFileDeCloudinary);

router.post('/delete/borrarSubirFiles',borrarSubirFiles);

router.post('/delete/borrarUnFile',borrarUnFile);

router.post('/actualizarUnaActividadDeMejoras',actualizarUnaActividadDeMejoras);

router.post('/obtenerFilesConIdActividadesDeMejora',obtenerFilesConIdActividadesDeMejora);

router.post('/obtenerFilesIdOportunidadDeMejora',obtenerFilesIdOportunidadDeMejora);

router.post('/obtenerFilesIdPlanDeMejoramiento',obtenerFilesIdPlanDeMejoramiento);

router.post('/obtenerFilesIdPrograma',obtenerFilesIdPrograma);

router.post('/borrarActividadDeMejora',borrarActividadDeMejora);

router.post('/agregarNotas',agregarNotas);

router.post('/AgregarNotasFechas',AgregarNotasFechas);

router.post('/quitarNotasFechas',quitarNotasFechas);

router.post('/crearUniversidad',crearUniversidad);

router.post('/agregarUsuarioUniversidad',agregarUsuarioUniversidad);

router.post('/obtenerTodasUniversidades',obtenerTodasUniversidades);

router.post('/obtenerUsuarios',obtenerUsuarios);





module.exports = router;
