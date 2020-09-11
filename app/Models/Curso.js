'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Curso extends Model {

  disciplinas () {
    return this.hasMany('App/Models/Disciplina')
  }

}

module.exports = Curso
