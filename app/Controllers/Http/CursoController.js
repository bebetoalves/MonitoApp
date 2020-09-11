"use strict";

const Curso = use("App/Models/Curso");
const { validateAll } = use("Validator");

class CursoController {
  async store({ request, response }) {
    try {
      const errorMessage = {
        "nome.required": "É obrigatório um nome para o Curso",
      };

      const validation = await validateAll(
        request.all(),
        {
          nome: "required",
        },
        errorMessage
      );

      if (validation.fails()) {
        return response.status(400).send({ message: validation.messages() });
      }

      const data = request.only(["nome"]);

      const curso = await Curso.create(data);

      return response.status(201).send(curso);
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async index({ response }) {
    try {
      const cursos = await Curso.all();

      return response.status(200).send(cursos);
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async destroy({ params, response }) {
    try {
      const curso = await Curso.query().where("id", params.id).first();

      if (!curso) {
        return response.status(400).send({ message: "Curso não existe" });
      }

      await curso.delete();
      return response.status(200).send("message: Curso removido com sucesso!");
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }

  async update({ params, request, response }) {
    const { nome } = request.all();

    const curso = await Curso.query().where("id", params.id).first();

    if (!curso) {
      return response.status(404).send({ message: "Curso não existe" });
    }

    curso.nome = nome;
    curso.id = params.id;

    await curso.save();

    return response.status(200).send(curso);
  }

  async show({ params, response }) {
    try {
      const curso = await Curso.query().where("id", params.id).first();

      if (!curso) {
        return response.status(400).send({ message: "Curso não existe" });
      }

      return response.status(200).send(curso);
    } catch (error) {
      return response.status(500).send({ erro: `Erro: ${error.message}` });
    }
  }
}

module.exports = CursoController;
