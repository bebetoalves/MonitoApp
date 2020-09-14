"use strict";

class Curso {
  get rules() {
    return {
      nome: "required|alpha_space|min:10",
    };
  }

  get messages() {
    return {
      required: "Este campo é obrigatório",
      alpha_space: "Este campo só aceita letras e espaços",
      "nome.min": "Este campo deve ter no mínimo 10 caracteres",
    };
  }
}

module.exports = Curso;
