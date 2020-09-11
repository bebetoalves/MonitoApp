const { test, trait } = use('Test/Suite')('User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')

test('um usuário pode ser criado', async ({ assert, client }) => {
  const { name, birthday, email, password } = await Factory.model('App/Models/User').make()

  const response = await client.post('/api/usuarios')
    .send({ name, birthday, email, password })
    .end();

  //Espera-se um retorno 200 (página existe)
  response.assertStatus(200);

  //Espera-se que os dados retornado no corpo da API sejam os mesmos enviados na requisição
  response.assertJSONSubset({
    user: {
      email: email
    }
  });

  //Espera-se que o usuário tenha sido registrado, verifica-se se existe ao menos um registrado
  await User.query().where({ name }).firstOrFail();

});

test('os usuários podem ser visualizados', async ({ assert, client }) => {
  const { name, birthday, email, password } = await Factory.model('App/Models/User').make()

  await User.create({
    name, birthday, email, password
  });

  const response = await client.get('/api/usuarios').end();

  //Espera-se um retorno 200 (página existe)
  response.assertStatus(200);

  //Espera-se que os dados retornado no corpo da API sejam os mesmos enviados na requisição
  response.assertJSONSubset([{
    email: email
  }]);
});

test('um usuário pode ser visualizado', async({ assert, client }) => {
  const { name, birthday, email, password } = await Factory.model('App/Models/User').make()

  const user = await User.create({
    name, birthday, email, password
  });

  const response = await client.get('/api/usuarios/' + user.id).end();

  response.assertStatus(200);
  response.assertJSONSubset({ email: email });
});

test('um usuário pode ser atualizado', async ({ assert, client }) => {
  const { name, birthday, email, password } = await Factory.model('App/Models/User').make()

  const user = await User.create({
    name, birthday, email, password
  });

  //Espera-se que o usuário a ser atualizado esteja registrado
  assert.equal(user.email, email);

  const novosDados = {
    name: 'Rafael',
    birthday: '13/02/1997',
    email: 'rafael@testando.com'
  };

  const response = await client.patch('/api/usuarios/' + user.id)
  .send(novosDados)
  .end();

  response.assertStatus(200);
  response.assertJSONSubset(novosDados);
});

test('um usuario pode ser apagado', async({ assert, client }) => {
  const { name, birthday, email, password } = await Factory.model('App/Models/User').make()

  const user = await User.create({
    name, birthday, email, password
  });

  assert.equal(user.email, email);

  const response = await client.delete('/api/usuarios/' + user.id).end();

  response.assertStatus(200);

  //Espera-se que o usuário não esteja mais registrado
  const findUser = await User.find(user.id);

  assert.isNull(findUser);
});
