'use strict';

const { test, trait } = use('Test/Suite')('Disciplina (Integração)')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Disciplina = use('App/Models/Disciplina')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Usuario = use('App/Models/Usuario')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tipo = use('App/Models/Tipo')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')
trait('DatabaseTransactions')

test("uma disciplina pode ser criada", async ({ assert, client }) => {
  const { nome, curso_id } = await Factory.model('App/Models/Disciplina').make();

  //Criação de um tipo professor e um usuário professor
  const tipo = await Tipo.create({
    titulo: 'Professor'
  });

  const user = await Factory.model('App/Models/Usuario').create();
  const findUser = await Usuario.find(user.id);
  await findUser.tipos().attach([tipo.id]);
  const user_id = user.id;

  const response = await client.post('/api/disciplinas')
    .send({ nome, curso_id, user_id })
    .end()

  response.assertStatus(201);

  response.assertJSONSubset({
    nome, curso_id
  });
});

test("as disciplinas podem ser visualizadas", async ({ assert, client }) => {
  const disciplinas = await Factory.model('App/Models/Disciplina').createMany(5);

  const allDisciplinas = await Disciplina.all();

  const response = await client.get('/api/disciplinas').end();

  response.assertStatus(200);
  response.assertJSON(allDisciplinas.toJSON());
});

test("uma disciplina em específico pode ser visualizada", async ({ assert, client }) => {
  const disciplina = await Factory.model('App/Models/Disciplina').create();

  const response = await client.get('/api/disciplinas/' + disciplina.id).end()

  response.assertStatus(200);
  response.assertJSONSubset({
    nome: disciplina.nome
  });
});

test("uma disciplina pode ser atualizada", async ({ assert, client }) => {
  const disciplina = await Factory.model('App/Models/Disciplina').create();

  const { nome, curso_id } = await Factory.model('App/Models/Disciplina').make()
  const atualizacao = { nome, curso_id };

  const response = await client.patch('/api/disciplinas/' + disciplina.id)
    .send(atualizacao)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(atualizacao);
});


test("uma disciplina pode ser apagada", async ({ assert, client }) => {
  const disciplina = await Factory.model('App/Models/Disciplina').create();

  const response = await client.delete('/api/disciplinas/' + disciplina.id).end()

  response.assertStatus(200);
  const findDisciplina = await Disciplina.find(disciplina.id);
  assert.isNull(findDisciplina);
});
