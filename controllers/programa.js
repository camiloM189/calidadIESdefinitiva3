const { response } = require("express");
const Programa = require('../models/ProgramasModel');
const { default: mongoose } = require("mongoose");
const ObtenerOportunidadDeMejoraPorId = require("../models/OportunidadDeMejora");
const PlanDeMejoramiento = require("../models/PlanDeMejoramiento");
const ActividadesDeMejora = require("../models/ActividadesDeMejora");
const ProyeccionDeEventos = require("../models/ProyeccionDeEventos");

const SubirFiles = require("../models/SubirFiles");


const Notas = require("../models/notas");
const notas = require("../models/notas");
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');


 const obtenerPrograma = async(req,res = response) => {

    const uidUsuario = req.uid;
    const programa = await Programa.find({ uidUsuario: uidUsuario });
    try {
        if(!programa) return;
        res.json({
            ok: true,
            programa
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se encontraron programas'
        })
    }   
}
const obtenerProgramasId = async(req,res = response) => {
    const uidUsuario = req.uid;
    const idPrograma = req.body;
    const programa = await Programa.find({ uidUsuario: uidUsuario });
   

    const programafiltrado = programa.filter((program) => program._id === idPrograma);

  
}


const crearPrograma = async(req,res = response) => {
    try {
        const {Programa} = req.body;
        const usuario = req.name;
        const uidUsuario = req.uid;
        let programa = await mongoose.model('Programa').create({Programa,usuario,uidUsuario})
        res.json({
            ok: true,
            programa
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear programa'
        })
    }
   
} 
const borrarPrograma = async(req,res = response) => {
    try {
        const idPrograma = req.params.idPrograma
  
        let borrarPrograma = await mongoose.model('Programa').
        findByIdAndDelete(idPrograma);

        let borrarPlanDeMejoramietno = await mongoose.model('PlanDeMejoramiento').
        deleteMany({idPrograma:idPrograma});

        let borrarOportunidadDeMejora = await mongoose.model('OportunidadDeMejora').
        deleteMany({idPrograma:idPrograma});

        let borrarAcctividadesDeMejora = await mongoose.model('ActividadesDeMejora').
        deleteMany({idPrograma:idPrograma});

        let borrarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').
        deleteMany({idPrograma:idPrograma})
        
        let borrarNotas = await mongoose.model('Notas').
        deleteMany({idPrograma:idPrograma})
    
        let borrarSubirFiles = await mongoose.model('SubirFiles').
        deleteMany({idPrograma:idPrograma})

         res.json({
             ok: true,
             borrarPrograma,
             borrarPlanDeMejoramietno,
             borrarOportunidadDeMejora,
             borrarAcctividadesDeMejora,
             borrarProyeccionDeEventos,
             borrarNotas,
             borrarSubirFiles
         })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo borrar el programa'
        })
    }
    
}
const obtenerPlanDeMejoramiento = async(req,res = response) => {
    try {
        const {idPrograma} = req.body;
     
        let obtenerPlanDeMejoramiento = await PlanDeMejoramiento.find({idPrograma:idPrograma});
        res.json({
            ok: true,
            obtenerPlanDeMejoramiento
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener programa'
        })
    }



}
const crearPLanDeMejoramiento = async(req,res = response) => {
    try {
    const {start,idPrograma,tituloDePlanDeMejoramiento} = req.body;
    const usuario = req.name;
    const uidUsuario = req.uid;
    

    let planDeMejoramiento = await mongoose.model('PlanDeMejoramiento').create({start,idPrograma,usuario,uidUsuario,tituloDePlanDeMejoramiento})
    res.json({
        ok: true,
        planDeMejoramiento
    })
  

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear el plan de mejoramiento'
        })
    }


}
const borrarPlanDeMejoramiento = async(req,res = response) => {
    try {


        const idPlanDeMejoramiento = req.params.idPlanDeMejoramiento

        let borrarPlanDeMejoramiento = await mongoose.model('PlanDeMejoramiento').findByIdAndDelete(idPlanDeMejoramiento);
   
        
        let borrarOportunidadDeMejora = await mongoose.model('OportunidadDeMejora').
        deleteMany({idPlanDeMejoramiento:idPlanDeMejoramiento});

        let borrarAcctividadesDeMejora = await mongoose.model('ActividadesDeMejora').
        deleteMany({idPlanDeMejoramiento:idPlanDeMejoramiento});

        let borrarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').
        deleteMany({idPlanDeMejoramiento:idPlanDeMejoramiento})
        
        let borrarNotas = await mongoose.model('Notas').
        deleteMany({idPlanDeMejoramiento:idPlanDeMejoramiento})
    
        let borrarSubirFiles = await mongoose.model('SubirFiles').
        deleteMany({idPlanDeMejoramiento:idPlanDeMejoramiento})

          res.json({
              ok: true,
              borrarPlanDeMejoramiento,
              borrarOportunidadDeMejora,
              borrarAcctividadesDeMejora,
              borrarProyeccionDeEventos,
              borrarNotas,
              borrarSubirFiles
          })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo borrar el plan de mejoramiento'
        })
    }



}
const crearOportunidadDeMejora = async(req,res = response) => {
    try {
    const {OportunidadDeMejoraTitle,start,idPrograma,
        calidadDeContenido,idPlanDeMejoramiento,programa} = req.body;

    const usuario = req.name;
    const uidUsuario = req.uid;

    let oportunidadesDeMejora = await mongoose.model('OportunidadDeMejora').create({programa,idPlanDeMejoramiento,OportunidadDeMejoraTitle,start,idPrograma,usuario,uidUsuario,calidadDeContenido})

    res.json({
        ok: true,
        oportunidadesDeMejora
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear un item'
        })
    }
    
}
const obtenerOportunidadDeMejoraPorId = async(req,res = response) => {

      try {
        const {idPrograma,idPlanDeMejoramiento} = req.body;


        let obtenerOportunidadDeMejoraPorId = await ObtenerOportunidadDeMejoraPorId.find({idPlanDeMejoramiento});
       
          res.json({
              ok: true,
              obtenerOportunidadDeMejoraPorId
          })

      } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener la oportunidad de mejora'
        })
      }
}
const actualizarOportunidadDeMejora = async(req,res = response) => {
try {
    const {OportunidadDeMejoraTitle,start,idPrograma,
        calidadDeContenido,idPlanDeMejoramiento,programa,idOportunidadDeMejora} = req.body;
        console.log(req.body);

     const usuario = req.name;
     const uidUsuario = req.uid;
     let actualizarOportundiadDeMejora = await ObtenerOportunidadDeMejoraPorId.findOneAndUpdate({_id:idOportunidadDeMejora},{OportunidadDeMejoraTitle,start,idPrograma,
         calidadDeContenido,idPlanDeMejoramiento,programa,idOportunidadDeMejora,usuario})
    res.json({
        ok: true,
        actualizarOportundiadDeMejora
    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'no se pudo actualizar la oportunidad de mejora'
    })
  }
}
const borrarOportunidadDeMejora = async(req,res = response) => {
    try {
        const idOportunidadDeMejora = req.params.idOportunidadDeMejora
        let borrarOportunidadDeMejora = await mongoose.model('OportunidadDeMejora').
        findByIdAndDelete(idOportunidadDeMejora);
   
        let borrarAcctividadesDeMejora = await mongoose.model('ActividadesDeMejora').
        deleteMany({idOportunidadDeMejora:idOportunidadDeMejora});

        let borrarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').
        deleteMany({idOportunidadDeMejora:idOportunidadDeMejora})
        
        let borrarNotas = await mongoose.model('Notas').
        deleteMany({idOportunidadDeMejora:idOportunidadDeMejora})

        let borrarSubirFiles = await mongoose.model('SubirFiles').
        deleteMany({idOportunidadDeMejora:idOportunidadDeMejora})


          res.json({
              ok: true,
              borrarProyeccionDeEventos,
              borrarOportunidadDeMejora,
              borrarAcctividadesDeMejora,
              borrarNotas,
              borrarSubirFiles
          })
    } catch (error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'no se pudo actualizar la oportunidad de mejora'
    })
    }



}
 const crearActividadesDeMejora = async(req,res = response) => {
    try {
        const {tituloDeActividades,idPlanDeMejoramiento,programa,idPrograma,start,calidadDeContenido,idOportunidadDeMejora} = req.body;
        const usuario = req.name;
        const uidUsuario = req.uid;
         let crearActividadesDeMejora = await mongoose.model('ActividadesDeMejora').create({tituloDeActividades,programa,idPrograma,start,calidadDeContenido,idOportunidadDeMejora,usuario,uidUsuario,idPlanDeMejoramiento})
         res.json({
            ok: true,
            crearActividadesDeMejora
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear la Actividad De Mejora'
        })
}
}
const obtenerActividadesDeMejora = async(req,res = response) => {
    
    try {
        const {idOportunidadDeMejora} = req.body;
        let obtenerActiviades = await ActividadesDeMejora.find({idOportunidadDeMejora:idOportunidadDeMejora});
        res.json({
            ok: true,
            obtenerActiviades
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener las actividades de mejora'
        })
    }
}
const actualizarActividadeDeOportunidadDeMejora = async(req,res = response) => {
    try {
        const usuario = req.name;
        const uidUsuario = req.uid;
        const { tituloDeActividades, idPlanDeMejoramiento, idPrograma, start, calidadDeContenido, idOportunidadDeMejora } = req.body;
        const nuevaActividad = {
            tituloDeActividades,
            idPlanDeMejoramiento,
            idPrograma,
            usuario,
            start,
            calidadDeContenido,
            idOportunidadDeMejora
        };
            const actualizado = await ActividadesDeMejora.create({ tituloDeActividades,
            idPlanDeMejoramiento,idPrograma,usuario,start,calidadDeContenido,idOportunidadDeMejora});
            res.json({
                ok: true,
                actualizado
            })
   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'no se pudo actualizar las actividades de mejora'
        })
    }
}
const actualizarUnaActividadDeMejoras = async(req,res = response) => {
    try {
      const { actualizarTitulosDeActividades,idActividadesDeMejora } = req.body;
      let actualizarUnaActividadDeMejora = await ActividadesDeMejora.findOneAndUpdate({_id:idActividadesDeMejora},{tituloDeActividades:actualizarTitulosDeActividades})
        res.json({
            ok:true,
            actualizarUnaActividadDeMejora
        })
    } catch (error) {
        
    }
}
const obtenerActividadefiltrada = async(req,res = response) => {
    
    try {
        const {idActividadesDeMejora,idOportunidadDeMejora} = req.body;
        let obtenerActiviades = await ActividadesDeMejora.find({idOportunidadDeMejora:idOportunidadDeMejora});

         res.json({
             ok: true,
             obtenerActiviades
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener las actividades de mejora'
        })
    }
}
const crearProyeccionDeEventos = async(req,res = response) => {
            
    try {
        const notasFecha1 = 0;
        const notasFecha2 = 0;
        const notasFecha3 = 0;
        const notasFecha4 = 0;
        const notasFecha5 = 0;
        const notasFecha6 = 0;
        const notasFecha7 = 0;
        const {idPlanDeMejoramiento,programa,idPrograma,tituloDeActividades,
            start,idOportunidadDeMejora,indicador,
            fecha1,fecha2,fecha3,fecha4,fecha5,fecha6,fecha7,idActividadesDeMejora,
            totalDeProyecciones
            } = req.body;
            const usuario = req.name;
            const uidUsuario = req.uid;
          


            let ProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').create({tituloDeActividades,programa,
                idPrograma,start,idOportunidadDeMejora,usuario,
                uidUsuario,idPlanDeMejoramiento,fecha1,fecha2,fecha3,fecha4,fecha5,fecha6
                ,fecha7,idActividadesDeMejora,indicador,totalDeProyecciones,notasFecha1,
                notasFecha2,notasFecha3,notasFecha4,notasFecha5,notasFecha6,notasFecha7})
            
                res.json({
                    ok: true,
                    ProyeccionDeEventos
                })


    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear la proyeccion de eventos'
        })
    }

}
const obtenerProyeccionDeEventos = async(req,res = response) => {
    
    try {
        const {idActividadesDeMejora} = req.body;
        let obtenerProyeccionDeEventos = await
         ProyeccionDeEventos.find({idActividadesDeMejora:idActividadesDeMejora});

         res.json({
             ok: true,
             obtenerProyeccionDeEventos
         })
      


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener las proyecciones de mejora'
        })
    }
}
const deleteProyeccionDeEventos = async(req,res = response) => {
    try {
        const {idProyeccionDeEventos} = req.body
        let borrarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').findByIdAndDelete(idProyeccionDeEventos);
        let borrarNota = await mongoose.model('Notas').deleteMany({idProyeccionDeEventos:idProyeccionDeEventos})
        let borrarFiles = await mongoose.model('SubirFiles').deleteMany({idProyeccionDeEventos:idProyeccionDeEventos})
       


        res.json({
            ok: true,
            borrarProyeccionDeEventos,
            borrarNota,
            borrarFiles
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'no se pudo borrar la proyeccion de eventos'
        })
    }
    
  
    
}
const crearNotas = async(req,res = response) => {
    try {
        const {titulosDeNotas,bodyDeNotas,idPlanDeMejoramiento,programa,idPrograma,
            start,dia,mes,idOportunidadDeMejora,idActividadesDeMejora,idProyeccionDeEventos,
            numeroDeNotas} = req.body;
            const usuario = req.name;
            const uidUsuario = req.uid;
       
            let CrearNotas = await mongoose.model('Notas').create({titulosDeNotas,bodyDeNotas,idPlanDeMejoramiento,programa,idPrograma,
                start,dia,mes,idOportunidadDeMejora,idActividadesDeMejora,idProyeccionDeEventos,numeroDeNotas,usuario,uidUsuario})

                res.json({
                    ok: true,
                    CrearNotas
                })

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo crear notas'
        })


    }
}

const agregarNotas = async (req,res = response) => {
    try {
        const {numeroDeNotas,idProyeccionDeEventos} = req.body


     let AgregarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},{totalDeNotas:numeroDeNotas})
     res.json({
        ok: true,
        AgregarProyeccionDeEventos
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
        
        })
    }
    

}
const AgregarNotasFechas = async (req,res = response) => {
    try {
        const {idActividadesDeMejora,notasFecha1,notasFecha2,notasFecha3,notasFecha4,notasFecha5,notasFecha6,notasFecha7,idProyeccionDeEventos} = req.body
        
        let obtenerProyeccionDeEventos = await
        ProyeccionDeEventos.find({idActividadesDeMejora:idActividadesDeMejora});
        
    

        const {notasFecha1:fecha1} = obtenerProyeccionDeEventos[0];
        const {notasFecha2:fecha2} = obtenerProyeccionDeEventos[0];
        const {notasFecha3:fecha3} = obtenerProyeccionDeEventos[0];
        const {notasFecha4:fecha4} = obtenerProyeccionDeEventos[0];
        const {notasFecha5:fecha5} = obtenerProyeccionDeEventos[0];
        const {notasFecha6:fecha6} = obtenerProyeccionDeEventos[0];
        const {notasFecha7:fecha7} = obtenerProyeccionDeEventos[0];
        

       if(notasFecha1 != undefined){
        const agregarNotaFecha1 = notasFecha1 + fecha1;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha1:agregarNotaFecha1})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha2 != undefined){
        const agregarNotaFecha2 = notasFecha2 + fecha2;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha2:agregarNotaFecha2})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha3 != undefined){
        const agregarNotaFecha3 = notasFecha3 + fecha3;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha3:agregarNotaFecha3})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha4 != undefined){
        const agregarNotaFecha4 = notasFecha4 + fecha4;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha4:agregarNotaFecha4})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha5 != undefined){
        const agregarNotaFecha5 = notasFecha5 + fecha5;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha5:agregarNotaFecha5})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha6 != undefined){
        const agregarNotaFecha6 = notasFecha6 + fecha6;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha6:agregarNotaFecha6})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }else if(notasFecha7 != undefined){
        const agregarNotaFecha7 = notasFecha7 + fecha7;
        let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
            {notasFecha7:agregarNotaFecha7})
            res.json({
                     ok: true,
                     AgregarFechas
                 })
       }

    //  let AgregarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},{notasFecha1:notasFecha1,notasFecha2:notasFecha2,notasFecha3:notasFecha3,notasFecha4:notasFecha4,notasFecha5:notasFecha5,notasFecha6:notasFecha6,notasFecha7:notasFecha7})
    //  res.json({
    //     ok: true,
    //     AgregarFechas
    // })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
        
        })
    }
    

}
const quitarNotasFechas = async(req, res = response) => {
    try {
        const {idActividadesDeMejora,notasFecha1,notasFecha2,notasFecha3,notasFecha4,notasFecha5,notasFecha6,notasFecha7,idProyeccionDeEventos} = req.body
        let obtenerProyeccionDeEventos = await
        ProyeccionDeEventos.find({idActividadesDeMejora:idActividadesDeMejora});
        
        const {notasFecha1:fecha1} = obtenerProyeccionDeEventos[0];
        const {notasFecha2:fecha2} = obtenerProyeccionDeEventos[0];
        const {notasFecha3:fecha3} = obtenerProyeccionDeEventos[0];
        const {notasFecha4:fecha4} = obtenerProyeccionDeEventos[0];
        const {notasFecha5:fecha5} = obtenerProyeccionDeEventos[0];
        const {notasFecha6:fecha6} = obtenerProyeccionDeEventos[0];
        const {notasFecha7:fecha7} = obtenerProyeccionDeEventos[0];
        console.log(fecha1);
        console.log(obtenerProyeccionDeEventos);

        
   
         if(notasFecha1 != undefined){
             let borrarFecha1 = fecha1 - notasFecha1 ;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha1:borrarFecha1})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha2 != undefined){
                let borrarFecha2 = fecha2 - notasFecha2;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha2:borrarFecha2})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha3 != undefined){
                let borrarFecha3 = fecha3 - notasFecha3;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha3:borrarFecha3})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha4 != undefined){
                let borrarFecha4 = fecha4 - notasFecha4;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha4:borrarFecha4})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha5 != undefined){
                let borrarFecha5 = fecha5 - notasFecha5;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha5:borrarFecha5})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha6 != undefined){
                let borrarFecha6 = fecha6 - notasFecha6;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha6:borrarFecha6})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }else if(notasFecha7 != undefined){
                let borrarFecha7 = fecha7 - notasFecha7;
             let borrarFechas = await mongoose.model('ProyeccionDeEventos').findByIdAndUpdate({_id:idProyeccionDeEventos},
                 {notasFecha7:borrarFecha7})
                 res.json({
                          ok: true,
                          borrarFechas
                      })
            }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'no se pudo borrar la fecha de las notas'
        })
    }
}
const obtenerNotas = async(req,res = response) => {
    try {
        
        const {idProyeccionDeEventos} = req.body;
        let obtenerNotas = await
         Notas.find({idProyeccionDeEventos:idProyeccionDeEventos});

         res.json({
             ok: true,
             obtenerNotas
         })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener notas'
        })
    }
}
const obtenerSetNota = async(req,res = response) => {
    try {
        
        const {idNotas} = req.body;
        let obtenerNota = await Notas.findById(idNotas);

         res.json({
             ok: true,
             obtenerNota
         })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo obtener nota'
        })
    }


}
const actualizarNota = async(req,res = response) => {
    try {
        const {titulosDeNotas,bodyDeNotas,idPlanDeMejoramiento,programa,idPrograma,
        start,dia,mes,idOportunidadDeMejora,idNotas,idActividadesDeMejora,idProyeccionDeEventos} = req.body;
        const uidUsuario = req.uid;

         let actualizarNota = await Notas.findOneAndUpdate({_id:idNotas},{titulosDeNotas,bodyDeNotas,start,dia,mes})
           
         res.json({
             ok: true,
             actualizarNota
         })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo actualizar nota'
        })
    }
}
const borrarNota = async(req,res = response) => {
    try {
        const idNotas = req.params.idNota;
         let borrarNota = await mongoose.model('Notas').
         findByIdAndDelete(idNotas)

        res.json({
            ok: true,
            borrarNota
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'no se pudo borrar la nota'
        })
    }

    
}

const uploadFiles = async (req, res = response) => {
    const apiSecret = "YYKxZcFtFxte6TirX2gJA5ZDK_0";
    const timestamp = Math.floor(Date.now() / 1000);
    const upload_preset = 'calidadies-react'
    const stringToSign = `timestamp=${timestamp}&upload_preset=${upload_preset}${apiSecret}`;
    const api_key = '948524788193582';
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
    const CloudUrl = 'https://api.cloudinary.com/v1_1/dpag6j5r8/upload';
    const cloud_name = 'dpag6j5r8';
    try {

    //    public_id: req.file.originalname
       const cloudResp = await cloudinary.uploader.upload(req.file.path, {
         upload_preset: upload_preset,
         api_key:api_key,
         timestamp:timestamp,
         signature:signature,
         cloud_name:cloud_name,
         resource_type: "auto",
         auto_process: false,
        //  public_id: req.file.originalname
       });

      res.json({
        ok: true,
        cloudResp
        
     })
       
    } catch (error) {
      console.log(error);
    }
};
const saveFiles = async(req,res = response) => {
    const {idNota,cloudResp,idPlanDeMejoramiento,idPrograma,
        idOportunidadDeMejora,idActividadesDeMejora,idProyeccionDeEventos,
        } = req.body;
    const {public_id} = cloudResp; 
    try {
        let SubirFiles = await mongoose.model('SubirFiles').create({idNota,cloudResp,idPlanDeMejoramiento,idPrograma,
            idOportunidadDeMejora,idActividadesDeMejora,idProyeccionDeEventos,public_id})

        res.json({
            ok: true,
            SubirFiles
        })
        
    } catch (error) {
      console.log(error);
        
    }
}
const obtenerFiles = async(req,res = response) => {
    try {
      
        const {idNota} = req.body;
        let obtenerArchivos = await SubirFiles.find({idNota:idNota});
  
        res.json({
            ok: true,
            obtenerArchivos
        })
    } catch (error) {
      console.log(error);
        
    }

}
const obtenerFilesConProyeccionDeEventos = async(req,res = response) => {
    try {
        const {idProyeccionDeEventos} = req.body;
       
        let obtenerFiles = await SubirFiles.find({idProyeccionDeEventos:idProyeccionDeEventos});

        res.json({
            ok: true,
            obtenerFiles
        })

    } catch (error) {
      console.log(error);
        



    }
}
const obtenerFilesConIdActividadesDeMejora = async(req,res = response) =>{
    try {
    const {idActividadesDeMejora} = req.body;
    let obtenerFiles = await SubirFiles.find({idActividadesDeMejora:idActividadesDeMejora});
    res.json({
        ok: true,
        obtenerFiles
    })
    } catch (error) {
      console.log(error);
        
    } 
}
const obtenerFilesIdOportunidadDeMejora = async(req,res = response) => {
    try {
    const {idOportunidadDeMejora} = req.body;
    let obtenerFiles = await SubirFiles.find({idOportunidadDeMejora:idOportunidadDeMejora});
    res.json({
        ok: true,
        obtenerFiles
    })

    } catch (error) {
      console.log(error);
       
        

    }
}
const obtenerFilesIdPlanDeMejoramiento = async(req,res = response) => {
    try {
     const {idPlanDeMejoramiento} = req.body       
 
    let obtenerFiles = await SubirFiles.find({idPlanDeMejoramiento:idPlanDeMejoramiento});

  
    res.json({
        ok: true,
        obtenerFiles
    })
    } catch (error) {
    }
}
const obtenerFilesIdPrograma = async(req,res = response) => {
    try {
     const {idPrograma} = req.body       
        
     let obtenerFiles = await SubirFiles.find({idPrograma:idPrograma});
     res.json({
        ok: true,
        obtenerFiles
    })
    } catch (error) {
        


    }
}
const borrarFileDeCloudinary = async(req,res = response) => {
    try {
        const public_id = req.body.public_id;
        
         const cloudinary = require("cloudinary").v2;
         cloudinary.config({
           cloud_name: "dpag6j5r8",
           api_key: "948524788193582",
           api_secret: "YYKxZcFtFxte6TirX2gJA5ZDK_0",
         });
    
        const response = await cloudinary.uploader.destroy(public_id)
   
    
        res.json({
            ok:true,
            response
        })
    } catch (error) {
        
    }
}
const borrarSubirFiles = async(req,res = response) => {
    try {
        const {_id} = req.body
        // const {idFiles} = req.body
        let borrarTodosLosFiles = await mongoose.model('SubirFiles').findByIdAndDelete(_id);
        
        res.json({
            ok:true,
            borrarTodosLosFiles
        })

    } catch (error) {
        
    }
}
const borrarUnFile = async(req,res = response) => {
    try {
        const {_id} = req.body;
        let borrarFile = await mongoose.model('SubirFiles').findByIdAndDelete(_id);

        res.json({
            ok:true,
            borrarFile
        })


    } catch (error) {
        
    }

}
const borrarActividadDeMejora = async(req,res = response) => {
    try {
        const {idActividadesDeMejora} = req.body;
     
  
        let borrarActividadesDeMejora = await mongoose.model('ActividadesDeMejora').
        findByIdAndDelete(idActividadesDeMejora);

        let borrarProyeccionDeEventos = await mongoose.model('ProyeccionDeEventos').
        deleteMany({idActividadesDeMejora:idActividadesDeMejora});

        let BorrarNotas = await mongoose.model('Notas').
        deleteMany({idActividadesDeMejora:idActividadesDeMejora});

        let BorrarFiles = await mongoose.model('SubirFiles').
        deleteMany({idActividadesDeMejora:idActividadesDeMejora});

        res.json({
            ok:true,
            borrarActividadesDeMejora,
            borrarProyeccionDeEventos,
            BorrarNotas,
            BorrarFiles
        })


    } catch (error) {
        



    }

}


module.exports = {obtenerPrograma,crearPrograma,crearOportunidadDeMejora,
    obtenerOportunidadDeMejoraPorId,obtenerProgramasId,crearPLanDeMejoramiento,
    obtenerPlanDeMejoramiento,borrarPrograma,crearActividadesDeMejora,obtenerActividadesDeMejora,
    borrarPlanDeMejoramiento,obtenerActividadefiltrada,crearProyeccionDeEventos
    ,obtenerProyeccionDeEventos,actualizarActividadeDeOportunidadDeMejora,actualizarOportunidadDeMejora,
    borrarOportunidadDeMejora,crearNotas,obtenerNotas,obtenerSetNota,actualizarNota,borrarNota,uploadFiles,
    saveFiles,obtenerFiles,deleteProyeccionDeEventos,borrarFileDeCloudinary,borrarSubirFiles,
    borrarUnFile,actualizarUnaActividadDeMejoras,obtenerFilesConProyeccionDeEventos,
    obtenerFilesConIdActividadesDeMejora,borrarActividadDeMejora,obtenerFilesIdOportunidadDeMejora,obtenerFilesIdPlanDeMejoramiento,
    obtenerFilesIdPrograma,agregarNotas,AgregarNotasFechas,quitarNotasFechas
}
