const { test, trait } = use('Test/Suite')('Curso')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Curso = use('App/Models/Curso')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')
trait('DatabaseTransactions')

test("um curso pode ser criado", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();

  const response = await client.post("/api/cursos")
    .send({ nome })
    .end();

  response.assertStatus(201);
  await Curso.query().where({ nome }).firstOrFail();
});

test("os cursos podem ser visualizados", async ({ assert, client }) => {
  const curso = await Factory.model('App/Models/Curso').createMany(3);

  const allCursos = await Curso.all();

  const response = await client.get("/api/cursos").end();

  response.assertStatus(200);
  response.assertJSON(allCursos.toJSON());
});

test("um curso em específico pode ser visualizado", async ({ assert, client }) => {
  const curso = await Factory.model('App/Models/Curso').create();

  const response = await client.get("/api/cursos/" + curso.id).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    nome: curso.nome
  });
});

test("um curso pode ser atualizado", async ({ assert, client }) => {
  const curso = await Factory.model('App/Models/Curso').create();

  const atualizacao = {
    nome: async () => {
      return (await Factory.model('App/Models/Curso').make()).nome
    }
  };

  const response = await client.patch('/api/cursos/' + curso.id)
    .send(atualizacao)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(atualizacao);
});

test("um curso pode ser apagado", async ({ assert, client }) => {
  const curso = await Factory.model('App/Models/Curso').create();

  const response = await client.delete("/api/cursos/" + curso.id).end();

  response.assertStatus(200);

  const findCurso = await Curso.find(curso.id);
  assert.isNull(findCurso);
});

test("curso não pode ser criado sem nome", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();

  const novoNome = {
    nome: "",
  };

  const response = await client.post("/api/cursos").send(novoNome).end();

  response.assertStatus(400);
});
