'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTypeSchema extends Schema {
  up () {
    this.create('user_type', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('type_id').references('id').inTable('types').onDelete('cascade')
    })
  }

  down () {
    this.drop('user_type')
  }
}

module.exports = UserTypeSchema
