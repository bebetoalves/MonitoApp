const { test, trait } = use('Test/Suite')('Usuario')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Usuario = use('App/Models/Usuario')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')

test('um usuário pode ser criado', async ({ assert, client }) => {
  const { nome, data_de_nascimento, email, senha } = await Factory.model('App/Models/Usuario').make()

  const response = await client.post('/api/usuarios')
    .send({ nome, data_de_nascimento, email, senha })
    .end();

  //Espera-se um retorno 200 (página existe)
  response.assertStatus(200);

  //Espera-se que os dados retornado no corpo da API sejam os mesmos enviados na requisição
  response.assertJSONSubset({
    usuario: {
      email: email
    }
  });

  //Espera-se que o usuário tenha sido registrado, verifica-se se existe ao menos um registrado
  await Usuario.query().where({ nome }).firstOrFail();

});

test('os usuários podem ser visualizados', async ({ assert, client }) => {
  const { nome, data_de_nascimento, email, senha } = await Factory.model('App/Models/Usuario').make()

  await Usuario.create({
    nome, data_de_nascimento, email, senha
  });

  const response = await client.get('/api/usuarios').end();

  //Espera-se um retorno 200 (página existe)
  response.assertStatus(200);

  //Espera-se que os dados retornado no corpo da API sejam os mesmos enviados na requisição
  response.assertJSONSubset([{
    email: email
  }]);
});

test('um usuário em específico pode ser visualizado', async({ assert, client }) => {
  const usuario = await Factory.model('App/Models/Usuario').create();

  const response = await client.get('/api/usuarios/' + usuario.id).end();

  response.assertStatus(200);
  response.assertJSONSubset({ nome: usuario.nome });
});

test('um usuário pode ser atualizado', async ({ assert, client }) => {
  const usuario = await Factory.model('App/Models/Usuario').create();

  const novosDados = {
    nome: 'Rafael',
    data_de_nascimento: '13/02/1997',
    email: 'rafael@testando.com'
  };

  const response = await client.patch('/api/usuarios/' + usuario.id)
  .send(novosDados)
  .end();

  response.assertStatus(200);
  response.assertJSONSubset(novosDados);
});

test('um usuario pode ser apagado', async({ assert, client }) => {
  const usuario = await Factory.model('App/Models/Usuario').create();

  const response = await client.delete('/api/usuarios/' + usuario.id).end();

  response.assertStatus(200);

  //Espera-se que o usuário não esteja mais registrado
  const findUsuario = await Usuario.find(usuario.id);

  assert.isNull(findUsuario);
});
