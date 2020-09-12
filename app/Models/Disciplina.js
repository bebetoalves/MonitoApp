'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Disciplina extends Model {
  cursos(){
      return this.hasMany('App/Models/Curso');
  }

  professor() {
    return this.belongsToMany('App/Models/Usuario', 'disciplina_id', 'usuario_id', 'id', 'id')
      .pivotTable('professor_disciplina');
  }
}

module.exports = Disciplina
