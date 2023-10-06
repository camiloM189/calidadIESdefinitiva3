const { response } = require('express');
const Eventos = require('../models/EventosModel');
const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');




const obtenerEventos = async (req, res = response) => {
    const eventos = await Eventos.find();
    // const eventosFiltrados = eventos.filter(events => events.pogramas === req.body.name);
    // console.log(req.body.name);
    // console.log(eventosFiltrados);

    res.json({
        ok: true,
        eventos
    })
}
const obtenerEventosPorId = async (req, res = response) => {
    const eventoId = req.params.id
    const evento = await Eventos.findById(eventoId)
    if (!evento) {
        res.status(404).json({
            ok: false,
            msg: 'no existe este elemento'
        })
    }
    res.json({
        ok: true,
        msg: 'obtener evento por id',
        evento
    })
}

const getItemList = async (req, res = response) => {
    const eventoId = req.params.pagina
    const itemId = req.params.id
    try {
        const { list } = await Eventos.findById(eventoId)
        const item = list.find(item => item._id == itemId)
        const { listItem } = item;
        res.json({
            ok: true,
            listItem
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'

        })
    }

}
const actualizarItemList = async (req, res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const { list } = await Eventos.findById(eventoId);
    const item = list.findIndex(item => item._id == itemId);

    const newItem = {
        ...req.body
    }
    list[item] = newItem


    try {
        const eventoActualizado = await Eventos.findByIdAndUpdate(
            eventoId,
            { list },
            { new: true }
        )
        res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const actualizarTitleItemList = async (req, res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const { list } = await Eventos.findById(eventoId);
    const item = list.findIndex(item => item._id == itemId);

    const newItem = {
        ...req.body
    }
    list[item] = newItem[0]
    console.log(list[item]);


    try {
        const eventoActualizado = await Eventos.findByIdAndUpdate(
            eventoId,
            { list },
            { new: true }
        )
        res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const borrarItemList = async (req, res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const evento = await Eventos.findById(eventoId);

    const itemIndex = evento.list.findIndex(item => item._id == itemId);
    evento.list.splice(itemIndex, 1);

    try {
        const eventoActualizado = await Eventos.findByIdAndUpdate(
            eventoId,
            { list: evento.list },
            { new: true }
        )


        res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const borrarMetas = async (req, res = response) => {
    try {
      const eventoId = req.params.pagina;
      const itemId = req.params.id;
      const metasId = req.params._id;

      const evento = await Eventos.findById(eventoId);
      if (!evento) {
        return res.status(404).json({ mensaje: 'No se encontró el evento' });
      }

      const item = evento.list.find(item => item._id == itemId);
      if (!item) {
        return res.status(404).json({ mensaje: 'No se encontró el item' });
      }

      const metaIndex = item.listItem.metas.findIndex(meta => meta._id == metasId);
      if (metaIndex === -1) {
        return res.status(404).json({ mensaje: 'No se encontró la meta' });
      }

      item.listItem.metas.splice(metaIndex, 1);

      await Eventos.findByIdAndUpdate(eventoId, evento, { new: true });

      res.json({
        ok: true,
        mensaje: 'Meta eliminada correctamente',
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
const borrarNotas = async (req, res = response) => {
    try {
      const eventoId = req.params.pagina;
      const itemId = req.params.id;
      const metasId = req.params._id;
      const notasId = req.params.noteId;

      const evento = await Eventos.findById(eventoId);
      if (!evento) {
        return res.status(404).json({ mensaje: 'No se encontró el evento' });
      }

      const item = evento.list.find(item => item._id == itemId);
      if (!item) {
        return res.status(404).json({ mensaje: 'No se encontró el item' });
      }

      const meta = item.listItem.metas.find(meta => meta._id == metasId);
      if (!meta) {
        return res.status(404).json({ mensaje: 'No se encontró la meta' });
      }

      const notaIndex = meta.note.findIndex(meta => meta._id == notasId);
      if (notaIndex === -1) {
        return res.status(404).json({ mensaje: 'No se encontró la meta' });
      }
      meta.note.splice(notaIndex, 1);

      await Eventos.findByIdAndUpdate(eventoId, evento, { new: true });

      res.json({
        ok: true,
        mensaje: 'Meta eliminada correctamente',
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
const getNotas = async (req,res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const metasId = req.params._id;
    const notasId = req.params.noteId;
    try {
        const { list } = await Eventos.findById(eventoId);
        const item = list.find(item => item._id == itemId);
        const { listItem } = item;
        const {metas} = listItem;
        const meta = metas.find(meta => meta._id == metasId);
        const {note} = meta;
        const notas = note.find(note => note._id == notasId)

        res.json({
            ok: true,
            notas
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const actualizarMetas = async (req,res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const metasId = req.params._id;
    const { list } = await Eventos.findById(eventoId);
    const item = list.find(item => item._id == itemId);
    const { listItem } = item;
    const metaIndex = listItem.metas.findIndex((meta) => meta._id == metasId);
    const newMeta = {
        ...req.body
    }
    console.log(newMeta);
    listItem.metas[metaIndex] = newMeta;

    try {
        const eventoActualizado = await Eventos.findByIdAndUpdate(
            eventoId,
            { list },
            { new: true }
        )
        res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const updateNotes = async(req,res = response) => {
    // const eventoId = req.params.pagina;
    // const itemId = req.params.id;
    // const metasId = req.params._id;
    // const notasId = req.params.noteId;

    // const { list } = await Eventos.findById(eventoId);
    //     const item = list.find(item => item._id == itemId);
    //     const { listItem } = item;
    //     const {metas} = listItem;
    //     const meta = metas.find(meta => meta._id == metasId);
    //     const {note} = meta;
    //     let notas = note.find(note => note._id == notasId);
    //     const newNota = {
    //         ...req.body
    //     }
    //     console.log(meta);
   
    const eventoId = req.params.pagina;
        const itemId = req.params.id;
        const metasId = req.params._id;
        const notasId = req.params.noteId;
      
        const { list } = await Eventos.findById(eventoId);
        const item = list.find((item) => item._id == itemId);
        const { listItem } = item;
        const { metas } = listItem;
        const metaIndex = metas.findIndex((meta) => meta._id == metasId);
        const meta = metas[metaIndex];
        const { note } = meta;
        const notasIndex = note.findIndex((nota) => nota._id == notasId);
        let nota = note[notasIndex];
      
        nota = { ...nota, ...req.body };
      
        note[notasIndex] = nota;
      
        meta.note = note;
      
        item.listItem.metas[metaIndex] = meta;
      
        try {
          const eventoActualizado = await Eventos.findByIdAndUpdate(
            eventoId,
            { list },
            { new: true }
          );
  
          res.json({
            ok: true,
            eventoActualizado,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
          });
        }
};
      


const getMetas = async (req,res = response) => {
    const eventoId = req.params.pagina;
    const itemId = req.params.id;
    const metasId = req.params._id;
    try {
        const { list } = await Eventos.findById(eventoId)
        const item = list.find(item => item._id == itemId)
        const { listItem } = item;
        const {metas} = listItem;
        const meta = metas.find(meta => meta._id == metasId);

        res.json({
            ok: true,
            meta
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'

        })
    }
}
const crearEventos = async (req, res = response) => {
    const evento = new Eventos(req.body);
    try {
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            msg: 'Crear eventos',
            evento: eventoGuardado


            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}
const actualizarEventos = async (req, res = response) => {
    const eventoId = req.params.id
    try {
        const evento = await Eventos.findById(eventoId)

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'no existe este elemento'
            })
        }
        const newEvento = {
            ...req.body
        }
        const eventoActualizado = await Eventos.findByIdAndUpdate(eventoId, newEvento, { new: true });

        res.json({
            ok: true,
            eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'

        })
    }
}
const borrarEventos = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        const evento = await mongoose.model('Evento').findById(eventoId);
        const uid = req.uid

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg_: 'Ese evento no existe',
            })
        }
        const BorrarEvento = await mongoose.model('Evento').findByIdAndDelete(eventoId);
        res.json({
            ok: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg_: 'hable con el admin',
        });
    }
}

// const generateDownloadLink = async (req, res = response) => {
//     try {
//         const {public_id} = req.body
//         const api_key = '948524788193582'
//         const cloud_name = 'dpag6j5r8';
//         const apiSecret = "YYKxZcFtFxte6TirX2gJA5ZDK_0";

//         const downloadLink = cloudinary.utils.download_zip_url({
//          public_ids: public_id,
//          resource_type: 'raw',
//          api_key:api_key,
//          api_secret:apiSecret,
//          cloud_name:cloud_name,
//        });
    
//         return res.json({
//            ok: true,
//            downloadLink
//        })

//     } catch (error) {
//       console.log(error);
//       throw new Error('Error al generar el enlace de descarga del archivo ZIP.');
//     }
// };
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

    //  public_id: req.file.originalname
      const cloudResp = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: upload_preset,
        api_key:api_key,
        timestamp:timestamp,
        signature:signature,
        cloud_name:cloud_name,
        resource_type: "auto",
        auto_process: false,
        // public_id: req.file.originalname
      });

      
 
    res.json({
        ok: true,
        cloudResp
    })
       
    } catch (error) {
      console.log(error);
    }

  };


module.exports = {
    obtenerEventos,
    crearEventos,
    actualizarEventos,
    borrarEventos,
    obtenerEventosPorId,
    actualizarItemList,
    getItemList,
    getMetas,
    actualizarMetas,
    borrarItemList,
    borrarMetas,
    getNotas,
    borrarNotas,
    uploadFiles,
    updateNotes,
    actualizarTitleItemList
    


}