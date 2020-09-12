"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UsuarioSeeder {
  async run() {
    await Factory.model("App/Models/Usuario").createMany(10);
  }
}

module.exports = UsuarioSeeder;
