const { test, trait } = use("Test/Suite")("Curso");
const Curso = use("App/Models/Curso");
const Factory = use("Factory");

trait("Test/ApiClient");

test("curso pode ser criado", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();
  const response = await client.post("/api/cursos").send({ nome }).end();

  response.assertStatus(201);
  await Curso.query().where({ nome }).firstOrFail();
});

test("o curso pode ser visualizado", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();
  await Curso.create({
    nome,
  });
  const response = await client.get("/api/cursos").end();
  response.assertStatus(200);
});

test("um curso em específico pode ser visualizado", async ({
  assert,
  client,
}) => {
  const { nome } = await Factory.model("App/Models/Curso").make();

  const curso = await Curso.create({
    nome,
  });

  const response = await client.get("/api/cursos/" + curso.id).end();

  response.assertStatus(200);
});

test("um curso pode ser modificado", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();

  const curso = await Curso.create({
    nome,
  });

  //Verificar se o curso foi cadastrado
  assert.equal(curso.nome, nome);

  const novoCurso = {
    nome: "Engenharia de Software"
  };

  const response = await client.patch('/api/cursos/' + curso.id)
  .send(novoCurso)
  .end();

  response.assertStatus(200);
  response.assertJSONSubset(novoCurso);
});

test("um curso pode ser apagado", async ({ assert, client }) => {
  const { nome } = await Factory.model("App/Models/Curso").make();

  const curso = await Curso.create({
    nome,
  });

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
