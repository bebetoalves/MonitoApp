'use strict'

/*
|--------------------------------------------------------------------------
| TypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const Tipo = use('App/Models/Tipo');

class TipoSeeder {
  async run() {

    const types = [
      { titulo: 'Aluno' },
      { titulo: 'Monitor' },
      { titulo: 'Professor' }
    ];

    await Tipo.createMany(types);
  }
}

module.exports = TipoSeeder
