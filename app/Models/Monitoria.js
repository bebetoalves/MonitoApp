'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Monitoria extends Model {
  monitor() {
    return this.hasOne('App/Models/Usuario');
  }

  disciplina() {
    return this.hasOne('App/Models/Disciplina')
  }
}

module.exports = Monitoria
