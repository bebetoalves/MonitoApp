'use strict'

class Noticia {
  get rules () {
    return {
      monitoria_id: 'required',
      mensagem: 'required|min:10',
    }
  }

  get messages () {
    return {
      'required': 'Este campo é obrigatório',
      'mensagem.min': 'Este campo deve ter no mínimo 10 caracteres'
    }
  }

}

module.exports = Noticia
