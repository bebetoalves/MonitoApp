'use strict'

const Curso = use('App/Models/Curso')
const Disciplina = use('App/Models/Disciplina')
const Usuario = use('App/Models/Usuario')
const Tipo = use('App/Models/Tipo')

class DisciplinaController {

  async store({ request, response }) {
    try {

      const data = request.only([
        'nome',
        'curso_id',
        'user_id'
      ])

      const tipoProfessor = await Tipo.query().where("titulo", "Professor").first();
      const user = await Usuario.find(data.user_id);
      const userType = await user.tipos().where('tipo_id', tipoProfessor.id).fetch();

      if (userType.rows == "") {
        return response.status(500).send({ error: 'O usuário não é um professor!' });
      }

      const disciplina = await Disciplina.create({
        'nome': data.nome,
        'curso_id': data.curso_id
      })

      const add_professor = await Disciplina.find(disciplina.id)
      await add_professor.professor().attach([user.id])

      return response.status(201).send(disciplina)

    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async destroy({ params, response }) {
    try {
      const disciplina = await Disciplina.query().where("id", params.id).first();

      if (!disciplina) {
        return response.status(400).send({ message: "Disciplina não existe" });
      }

      await disciplina.delete();

      return response.status(200).send({ message: 'Disciplina removida com sucesso!' });

    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['nome', 'curso_id']);

      const disciplina = await Disciplina.findOrFail(params.id);

      if (!disciplina) {
        return response.status(400).send({ message: "Disciplina não existe" });
      }

      disciplina.merge(data);

      await disciplina.save();

      return response.status(200).send(disciplina);
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }

  }

  async show({ params, response }) {
    try {
      const disciplina = await Disciplina.query().where("id", params.id).first();

      if (!disciplina) {
        return response.status(400).send({ message: "Disciplina não existe" });
      }

      return response.status(200).send(disciplina);

    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async index({ request, response }) {
    try {
      const disciplina = await Disciplina.all();

      return response.status(200).send(disciplina);
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }

  }
}

module.exports = DisciplinaController
