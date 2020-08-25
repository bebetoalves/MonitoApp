'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  users() {
    return this.belongsToMany('App/Models/User', 'type_id', 'user_id', 'id', 'id')
               .pivotTable('user_type');
  }
}

module.exports = Type
