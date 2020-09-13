'use strict'

const { test } = use('Test/Suite')('Usuario (Testes unitários)');
const { validate } = use('Validator')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const UsuarioValidator = use('App/Validators/Usuario');

test('o usuário deve informar um nome', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { nome: '' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'nome',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('o usuário deve ter um nome composto apenas por letras', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { nome: '123 456 789' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'nome',
    validation: 'alphaSpace',
    message: 'Este campo só aceita letras e espaços'
  }]);
});

test('o usuário deve ter um nome de no mínimo 5 caracteres', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { nome: 'José' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'nome',
    validation: 'min',
    message: 'Este campo deve ter no mínimo 5 caracteres'
  }]);
});

test('o usuario deve informar uma data de nascimento', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { data_de_nascimento: '' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'data_de_nascimento',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('o usuário deve informar uma data de nascimento no formato DD/MM/AAAA', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { data_de_nascimento: '32/23/2000' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'data_de_nascimento',
    validation: 'birthday',
    message: 'Este campo só aceita data com formato DD/MM/AAAA'
  }]);
});

test('o usuário deve informar um e-mail', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { email: '' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'email',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('o usuário deve informar um e-mail válido', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { email: 'email inválido' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'email',
    validation: 'email',
    message: 'Este campo só aceita endereço de e-mail válido'
  }]);
});

test('o usuário deve ter um e-mail único', async ({ assert }) => {
  const usuarioAleatorio = await Factory.model('App/Models/Usuario').create();

  const novoUsuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(novoUsuario.toJSON(), { email: usuarioAleatorio.email });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'email',
    validation: 'unique',
    message: 'Este e-mail está sendo utilizado por outro usuário'
  }]);
});

test('o usuário deve informar uma senha', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { senha: '' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'senha',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('o usuário deve informar uma senha de no mínimo 6 caracteres', async ({ assert }) => {
  const usuario = await Factory.model('App/Models/Usuario').make();

  const data = Object.assign(usuario.toJSON(), { senha: '123' });

  const validacao = await validate(data, (new UsuarioValidator).rules, (new UsuarioValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'senha',
    validation: 'min',
    message: 'Este campo deve ter no mínimo 6 caracteres'
  }]);
});
