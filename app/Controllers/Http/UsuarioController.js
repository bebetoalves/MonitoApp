'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Usuario = use('App/Models/Usuario')

class UsuarioController {
  /**
     * Show a list of all types.
     * GET types
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
  async index({ request, response, view }) {
    return await Usuario.all();
  }

  /**
   * Render a form to be used for creating a new type.
   * GET types/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new type.
   * POST types
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['nome', 'data_de_nascimento', 'email', 'senha']);

    const usuario = await Usuario.create(data);

    return response.ok({ usuario });
  }

  /**
   * Display a single type.
   * GET types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const usuario = await Usuario.findOrFail(params.id);

    return response.ok(usuario);
  }

  /**
   * Render a form to update an existing type.
   * GET types/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update type details.
   * PUT or PATCH types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const usuario = await Usuario.findOrFail(params.id);
    const data = request.only(['nome', 'data_de_nascimento', 'email']);

    usuario.merge(data);
    await usuario.save();

    return response.ok(usuario);
  }

  /**
   * Delete a type with id.
   * DELETE types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const usuario = await Usuario.findOrFail(params.id);

    await usuario.delete();

    return response.ok();
  }
}

module.exports = UsuarioController
