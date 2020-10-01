'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Monitoria = use('App/Models/Monitoria');

/**
 * Resourceful controller for interacting with monitorias
 */
class MonitoriaController {
  /**
   * Show a list of all monitorias.
   * GET monitorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await Monitoria.all();
  }

  /**
   * Render a form to be used for creating a new monitoria.
   * GET monitorias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new monitoria.
   * POST monitorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['disciplina_id', 'usuario_id', 'horario', 'local']);

    const monitoria = await Monitoria.create(data);

    return response.ok({ monitoria });
  }

  /**
   * Display a single monitoria.
   * GET monitorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const monitoria = await Monitoria.findOrFail(params.id);

    return response.ok(monitoria);
  }

  /**
   * Render a form to update an existing monitoria.
   * GET monitorias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update monitoria details.
   * PUT or PATCH monitorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const monitoria = await Monitoria.findOrFail(params.id);
    const data = request.only(['disciplina_id', 'usuario_id', 'horario', 'local']);

    monitoria.merge(data);
    await monitoria.save();

    return response.ok(monitoria);
  }

  /**
   * Delete a monitoria with id.
   * DELETE monitorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const monitoria = await Monitoria.findOrFail(params.id);

    await monitoria.delete();

    return response.ok();
  }
}

module.exports = MonitoriaController
