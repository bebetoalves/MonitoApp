'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplinaSchema extends Schema {
  up () {
    this.create('disciplinas', (table) => {
      table.increments()
      table.string('nome', 100).notNullable()
      table.integer('curso_id').references('id').inTable('cursos').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('disciplinas')
  }
}

module.exports = DisciplinaSchema
