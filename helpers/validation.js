const validator = require('validator')

const validateArticle = (params) =>{

  let titulo = !validator.isEmpty(params.titulo) && validator.isLength(params.titulo, {min: 5, max: undefined})

  let contenido = !validator.isEmpty(params.contenido);

  if(!titulo || !contenido){
    throw new Error('No se ha validado la información');
  }
}

module.exports = {
  validateArticle
}