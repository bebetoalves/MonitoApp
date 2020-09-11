'use strict'

const { test, trait } = use('Test/Suite')('Disciplina')

const Disciplina = use('App/Models/Disciplina')

const Factory = use("Factory");

trait("Test/ApiClient")




test("Uma disciplina pode ser apagada", async ({ assert, client }) => {
  const disciplina = await Disciplina.create({
    nome: 'Português',
    curso_id: 1
  })

  const response = await client.delete('/disciplina/' + disciplina.id).end()

  response.assertStatus(200)

});

test("Uma disciplina pode ser criada", async ({ assert, client }) => {
  const disciplina = await Disciplina.create({
    nome: 'Matemática',
    curso_id: 1
  })

  const response = await client.post('/disciplinas').send({
    nome: 'Matemática',
    curso_id: 1
  })
  .end()

  response.assertStatus(201)
});

test("As disciplinas podem ser visualizadas", async ({ assert, client }) => {
  const disciplina = await Disciplina.create({
    nome: 'Matemática',
    curso_id: 1
  })

  const response = await client.get('/disciplinas').end()

  response.assertStatus(200)
});

test("As disciplinas podem ser visualizadas", async ({ assert, client }) => {
  const disciplina = await Disciplina.create({
    nome: 'Matemática',
    curso_id: 1
  })

  const response = await client.get('/disciplina/' + disciplina.id).end()

  response.assertStatus(200)
});

test("As disciplinas podem ser visualizadas", async ({ assert, client }) => {
  const disciplina = await Disciplina.create({
    nome: 'Matemática',
    curso_id: 1
  })

  const response = await client.put('/disciplina/' + disciplina.id).end()

  response.assertStatus(200)
});

