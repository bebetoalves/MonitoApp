'use strict';

const { test, trait } = use('Test/Suite')('Noticia (Integração)')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Noticia = use('App/Models/Noticia')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient')

test('uma noticia pode ser criada', async ({ assert, client }) => {
  const { monitoria_id, mensagem } = await Factory.model('App/Models/Noticia').make()

  const response = await client.post('/api/noticias')
    .send({ monitoria_id, mensagem })
    .end();

  response.assertStatus(200);

  response.assertJSONSubset({
    noticia: { monitoria_id, mensagem }
  });
});

test('as noticias podem ser visualizadas', async ({ assert, client }) => {
  const noticias = await Factory.model('App/Models/Noticia').createMany(5);

  const allNoticias = await Noticia.all();

  const response = await client.get('/api/noticias').end();

  response.assertStatus(200);

  response.assertJSONSubset(allNoticias.toJSON());
});

test('uma noticia em especifico pode ser visualizada', async ({ assert, client }) => {
  const noticia = await Factory.model('App/Models/Noticia').create();

  const response = await client.get("/api/noticias/" + noticia.id).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    mensagem: noticia.mensagem
  });
});

test('uma noticia pode ser atualizada', async ({ assert, client }) => {
  const noticia = await Factory.model('App/Models/Noticia').create();

  const atualizacao = {
    mensagem: async () => {
      return (await Factory.model('App/Models/Noticia').make()).mensagem
    }
  };

  const response = await client.patch('/api/noticias/' + noticia.id)
    .send(atualizacao)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(atualizacao);
});

test('uma notícia pode ser apagada', async ({ assert, client }) => {
  const noticia = await Factory.model('App/Models/Noticia').create();

  const response = await client.delete("/api/noticias/" + noticia.id).end();

  response.assertStatus(200);

  const findNoticia = await Noticia.find(noticia.id);
  assert.isNull(findNoticia);
});
