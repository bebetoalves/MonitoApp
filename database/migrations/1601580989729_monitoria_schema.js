'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MonitoriaSchema extends Schema {
  up () {
    this.create('monitorias', (table) => {
      table.increments()
      table.integer('usuario_id').references('id').inTable('usuarios').onDelete('cascade')
      table.integer('disciplina_id').references('id').inTable('disciplinas').onDelete('cascade')
      table.string('horario').notNullable()
      table.string('local').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('monitorias')
  }
}

module.exports = MonitoriaSchema
