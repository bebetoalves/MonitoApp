'use strict'

const Curso = use('App/Models/Curso')
class CursoController {

    async store({ request, response }) {
        const data = request.only(['nome'])
        const curso = await Curso.create(data)
        return response.status(201).send(curso)
    }

    async index({ response }) {
        const cursos = await Curso.all();

        return response.status(200).send(cursos);
    }

    async destroy({ params, request, response }) {
        const curso = await Curso.query().where("id", params.id).first();

        await curso.delete();
        return response.status(200).send("message: Curso removido com sucesso!");
    }

    async update({ params, request, response }) {
        const { nome } = request.only();

        const curso = await Curso.query().where("id", params.id).first();

        curso.nome = nome;
        curso.id = params.id;

        await curso.save();

        return response.status(200).send(curso);
    }

    async show({ params, response }) {
        const curso = await Curso.query().where("id", params.id).first();

        return response.status(200).send(curso);
    }



}

module.exports = CursoController
