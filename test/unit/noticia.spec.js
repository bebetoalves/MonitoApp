'use strict'

const { test } = use('Test/Suite')('Noticia');
const { validate } = use('Validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Noticia = use('App/Models/Noticia');

const NoticiaValidator = use('App/Validators/Noticia');

test('uma noticia deve estar ligada a uma monitoria', async ({ assert }) => {
  const data = {
    monitoria_id: '',
    mensagem: 'Esta é uma mensagem',
  };

  const validacao = await validate(data, (new NoticiaValidator).rules, (new NoticiaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'monitoria_id',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('uma noticia deve ter uma mensagem', async ({ assert }) => {
  const data = {
    monitoria_id: 1,
    mensagem: '',
  };

  const validacao = await validate(data, (new NoticiaValidator).rules, (new NoticiaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'mensagem',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('uma noticia deve ter uma mensagem de no mínimo 10 caracteres', async ({ assert }) => {
  const data = {
    monitoria_id: 1,
    mensagem: 'abc',
  };

  const validacao = await validate(data, (new NoticiaValidator).rules, (new NoticiaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'mensagem',
    validation: 'min',
    message: 'Este campo deve ter no mínimo 10 caracteres'
  }]);
});
