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

const Type = use('App/Models/Type');

class TypeSeeder {
  async run() {

    const types = [
      { title: 'Aluno' },
      { title: 'Monitor' },
      { title: 'Professor' }
    ];

    await Type.createMany(types);
  }
}

module.exports = TypeSeeder
