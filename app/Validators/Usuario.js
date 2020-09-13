'use strict'

class Usuario {
  get rules () {
    return {
      nome: 'required|alpha_space|min:5',
      data_de_nascimento: 'required|birthday',
      email: 'required|email|unique:usuarios,email',
      senha: 'required|min:6',
    }
  }

  get messages() {
    return {
      'required': 'Este campo é obrigatório',
      'alpha_space': 'Este campo só aceita letras e espaços',
      'nome.min': 'Este campo deve ter no mínimo 5 caracteres',
      'birthday': 'Este campo só aceita data com formato DD/MM/AAAA',
      'email': 'Este campo só aceita endereço de e-mail válido',
      'email.unique': 'Este e-mail está sendo utilizado por outro usuário',
      'senha.min': 'Este campo deve ter no mínimo 6 caracteres'
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = Usuario
