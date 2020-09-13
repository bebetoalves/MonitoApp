"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Moment = use("moment");

Factory.blueprint("App/Models/Usuario", (faker) => {
  return {
    nome: faker.name(),
    data_de_nascimento: Moment(faker.birthday({string: true, american: false}), 'DD/M/YYYY').format('DD/MM/YYYY'),
    email: faker.email(),
    senha: '12345678'
  }
})

Factory.blueprint("App/Models/Curso", (faker) => {
  return {
    nome: faker.name(),
  };
});

Factory.blueprint("App/Models/Disciplina", (faker = {}) => {
  return {
    nome: faker.name(),
    curso_id: async () => {
      return (await Factory.model('App/Models/Curso').create()).id
    }
  };
});

Factory.blueprint("App/Models/Noticia", (faker = {}) => {
  return {
    monitoria_id: faker.integer({min: 1, max: 1}),
    mensagem: faker.paragraph()
  };
});
