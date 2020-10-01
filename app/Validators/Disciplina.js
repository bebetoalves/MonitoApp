"use strict"

class Disciplina {
  get rules() {
    return {
      nome: "required|alpha_space|min:5",
      curso_id: "required|exists:cursos,id",
      user_id: "required|exists:usuarios,id"
    };
  }

  get messages() {
    return {
      required: "Este campo é obrigatório",
      alpha_space: "Este campo só aceita letras e espaços",
      "nome.min": "Este campo deve ter no mínimo 5 caracteres",
      "curso_id.exists": "O curso informado é inválido",
      "user_id.exists": "O usuário informado é inválido"
    };
  }
}

module.exports = Disciplina;
