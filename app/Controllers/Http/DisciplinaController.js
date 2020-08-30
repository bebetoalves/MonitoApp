'use strict'

const Curso = use('App/Models/Curso')
const Disciplina = use('App/Models/Disciplina')
const { validateAll } = use('Validator')

class DisciplinaController {

  async store({ request, response }) {

    const data = request.only([
      'nome',
      'curso_id'
    ])
    const disciplina = await Disciplina.create(data)

    return response.status(201).send(disciplina)
  }

  async destroy({ params, response }) {
    const disciplina = await Disciplina.query().where("id", params.id).first();

    await disciplina.delete();
    return response.status(200).send("message: Disciplina removida com sucesso!");
  }

  async update({ params, request, response  }){
    const {nome} = request.only(['nome']);

    const disciplina = await Disciplina.query().where("id", params.id).first();

    disciplina.nome = nome;
    disciplina.id = params.id;

    await disciplina.save();

    return response.status(200).send(disciplina);

  }



  async show({ params, response }){
    const disciplina = await Disciplina.query().where("id", params.id).first();

    return response.status(200).send(disciplina);
  }



  async index({ request, response }){
    const disciplina = await Disciplina.all();

    return response.status(200).send(disciplina);
  }


}

module.exports = DisciplinaController
