const {response} = require('express')

const {validationResult} = require('express-validator');

const data = (req) => {
    const result = validationResult(req);
    const errors = result.array();
    const list = req.body.list;
    const [{listItem}] = list;
    const {indicador,titleItem,metas,start,end} = listItem;
    return {
        list,
        listItem,
        indicador,
        titleItem,
        metas,
        start,
        end,
        errors
    }
}
const errorResponse = (finalErrors,res) => {
    return res.status(400).json({
         ok:false,
         error:finalErrors
     });
 }
 const validarListItem = (req,res = response,next) => {
    const {listItem,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'listItem')
  
    // if(Object.entries(listItem).length === 0){
    //     return errorResponse(finalErrors,res)
    // }
    next()
}
const validarIndicador = (req,res = response, next) => {
    const {indicador,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'start')

    // if(indicador.length === 0){
    //     return errorResponse(finalErrors,res)
    // }
    next()
}
const validarTitleItem = (req,res = response, next) => {
    const {titleItem,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'titleItem')

    // if(titleItem.length === 0){
    //     return errorResponse(finalErrors,res)
    // }
    next()
}
const validarFechaDeInicio = (req,res = response, next) => {
    const {start,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'start')

    // if(start === undefined){
    //     return errorResponse(finalErrors,res)
    // }
    next()
}
const validarFechaDeFinalizacion = (req,res = response, next) => {
    const {end,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'end')

    // if(end === undefined){
    //     return errorResponse(finalErrors,res)
    // }
    next()
}
const validarMetas = (req,res = response, next) => {
    const {metas,errors} = data(req)
    const finalErrors = errors.filter(error => error.param === 'metas')
 
    //  if(metas.length === 0){
    //      return errorResponse(finalErrors,res)
    // }
    next()
}
const validarMetasTitle = (req,res = response, next) => {
    const {metas,errors} = data(req)
    const [{metaTitle}] = metas
    const finalErrors = errors.filter(error => error.param === 'metasTitle')

    //   if(metaTitle === undefined){
    //       return errorResponse(finalErrors,res)
    //  }

    //  if(metaTitle.length === 0){
    //     return errorResponse(finalErrors,res)
    //  }
    next()
}
const validarMetasFechaInicio = (req,res = response, next) => {
    const {metas,errors} = data(req)
    const [{start}] = metas
    const finalErrors = errors.filter(error => error.param === 'metasStart')
    
    // if(start === undefined){
    //       return errorResponse(finalErrors,res)
    // }
    next()
}
const validarMetasFechaFinalizacion = (req,res = response, next) => {
    const {metas,errors} = data(req)
    const [{end}] = metas
    const finalErrors = errors.filter(error => error.param === 'metasEnd')



    // if(end === undefined){
    //       return errorResponse(finalErrors,res)
    // }
    next()
}


module.exports = {
    validarListItem,
    validarFechaDeInicio,
    validarIndicador,
    validarTitleItem,
    validarFechaDeFinalizacion,
    validarMetas,
    validarMetasTitle,
    validarMetasFechaInicio,
    validarMetasFechaFinalizacion
}


