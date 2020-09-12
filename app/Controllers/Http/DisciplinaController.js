'use strict'

const Curso = use('App/Models/Curso')
const Disciplina = use('App/Models/Disciplina')
const { validateAll } = use("Validator");

class DisciplinaController {

  async store({ request, response }) {
    try {
      const errorMessage = {
        'nome.required': 'É obrigatório um nome para a Disciplina',
        'curso_id.required': 'É obrigatório um id do Curso'
      };

      const validation = await validateAll(request.all(),
        {
          nome: 'required',
          curso_id: 'required'
        },
        errorMessage
      )

      if (validation.fails()) {
        return response.status(400).send({ message: validation.messages() });
      }

      const data = request.only([
        'nome',
        'curso_id'
      ])

      const disciplina = await Disciplina.create(data)

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

      return response.status(200).send("message: Disciplina removida com sucesso!");

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
