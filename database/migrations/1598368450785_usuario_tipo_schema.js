'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioTipoSchema extends Schema {
  up () {
    this.create('usuario_tipo', (table) => {
      table.increments()
      table.integer('usuario_id').references('id').inTable('usuarios').onDelete('cascade')
      table.integer('tipo_id').references('id').inTable('tipos').onDelete('cascade')
    })
  }

  down () {
    this.drop('usuario_tipo')
  }
}

module.exports = UsuarioTipoSchema
