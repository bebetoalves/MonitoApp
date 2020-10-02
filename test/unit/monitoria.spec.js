'use strict'

const { test } = use('Test/Suite')('Monitoria (Unidade)');
const { validate } = use('Validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Monitoria = use('App/Models/Monitoria');

const MonitoriaValidator = use('App/Validators/Monitoria');

/**
 * uma monitoria deve ter uma disciplina
 * uma monitoria deve ter um monitor
 * uma monitoria deve ter um horário
 * uma monitoria deve ter um local
 *
 */

test('uma monitoria deve ter uma disciplina', async ({ assert }) => {
  const data = {
    disciplina_id: '',
    usuario_id: '1',
    horario: 'De 13:30 às 15:30',
    local: 'Sala 13, Bloco 2',
  };

  const validacao = await validate(data, (new MonitoriaValidator).rules, (new MonitoriaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'disciplina_id',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('uma monitoria deve ter um monitor', async ({ assert }) => {
  const data = {
    disciplina_id: '1',
    usuario_id: '',
    horario: 'De 13:30 às 15:30',
    local: 'Sala 13, Bloco 2',
  };

  const validacao = await validate(data, (new MonitoriaValidator).rules, (new MonitoriaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'usuario_id',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('uma monitoria deve ter um horário', async ({ assert }) => {
  const data = {
    disciplina_id: '1',
    usuario_id: '1',
    horario: '',
    local: 'Sala 13, Bloco 2',
  };

  const validacao = await validate(data, (new MonitoriaValidator).rules, (new MonitoriaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'horario',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});

test('uma monitoria deve ter um local', async ({ assert }) => {
  const data = {
    disciplina_id: '1',
    usuario_id: '1',
    horario: 'De 13:30 às 15:30',
    local: '',
  };

  const validacao = await validate(data, (new MonitoriaValidator).rules, (new MonitoriaValidator).messages);

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [{
    field: 'local',
    validation: 'required',
    message: 'Este campo é obrigatório'
  }]);
});
