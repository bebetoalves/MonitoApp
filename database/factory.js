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

Factory.blueprint("App/Models/User", (faker) => {
  return {
    name: faker.name(),
    birthday: faker.date({ string: true, american: false }),
    email: faker.email(),
    password: "12345678",
  };
});

Factory.blueprint("App/Models/Curso", (faker) => {
  return {
    nome: faker.name(),
  };
});
