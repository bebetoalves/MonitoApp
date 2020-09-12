'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tipo extends Model {
  users() {
    return this.belongsToMany('App/Models/Usuario', 'tipo_id', 'usuario_id', 'id', 'id')
      .pivotTable('usuario_tipo');
  }
}

module.exports = Tipo
