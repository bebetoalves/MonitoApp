"use strict"

class Disciplina {
  get rules() {
    return {
      nome: "required|alpha_space|min:5",
    };
  }

  get messages() {
    return {
      required: "Este campo é obrigatório",
      alpha_space: "Este campo só aceita letras e espaços",
      "nome.min": "Este campo deve ter no mínimo 5 caracteres",
    };
  }
}

module.exports = Disciplina;
