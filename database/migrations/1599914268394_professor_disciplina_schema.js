'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorDisciplinaSchema extends Schema {
  up () {
    this.create('professor_disciplina', (table) => {
      table.increments()
      table.integer('usuario_id').references('id').inTable('usuarios').onDelete('cascade')
      table.integer('disciplina_id').references('id').inTable('disciplinas').onDelete('cascade')
    })
  }

  down () {
    this.drop('professor_disciplina')
  }
}

module.exports = ProfessorDisciplinaSchema
