'use strict'

class Monitoria {
  get rules() {
    return {
      disciplina_id: 'required',
      usuario_id: 'required',
      horario: 'required',
      local: 'required'
    }
  }

  get messages() {
    return {
      'required': 'Este campo é obrigatório',
    }
  }

}

module.exports = Monitoria
