'use strict';

const { test, trait } = use('Test/Suite')('Monitoria (Integração)')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Monitoria = use('App/Models/Monitoria')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')

test('uma monitoria pode ser criada', async ({ assert, client }) => {
  const { disciplina_id, usuario_id, horario, local } = await Factory.model('App/Models/Monitoria').make()

  const response = await client.post('/api/monitorias')
    .send({ disciplina_id, usuario_id, horario, local })
    .end();

  response.assertStatus(200);

  response.assertJSONSubset({
    monitoria: { disciplina_id, usuario_id, horario, local }
  });
});

test('as monitorias podem ser visualizadas', async ({ assert, client }) => {
  const monitorias = await Factory.model('App/Models/Monitoria').createMany(5);

  const allMonitorias = await Monitoria.all();

  const response = await client.get('/api/monitorias').end();

  response.assertStatus(200);

  response.assertJSONSubset(allMonitorias.toJSON());
});

test('uma monitoria especifica pode ser visualizada', async ({ assert, client }) => {
  const monitoria = await Factory.model('App/Models/Monitoria').create();

  const response = await client.get("/api/monitorias/" + monitoria.id).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: monitoria.id
  });
});

test('uma monitoria pode ser atualizada', async ({ assert, client }) => {
  const monitoria = await Factory.model('App/Models/Monitoria').create();

  const { disciplina_id, usuario_id, horario, local } = await Factory.model('App/Models/Monitoria').make();
  const atualizacao = { disciplina_id, usuario_id, horario, local }

  const response = await client.patch('/api/monitorias/' + monitoria.id)
    .send(atualizacao)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ ...atualizacao });
});

test('uma monitoria pode ser apagada', async ({ assert, client }) => {
  const monitoria = await Factory.model('App/Models/Monitoria').create();

  const response = await client.delete("/api/monitorias/" + monitoria.id).end();

  response.assertStatus(200);

  const findMonitoria = await Monitoria.find(monitoria.id);
  assert.isNull(findMonitoria);
});
