"use strict";
const CursoController = require("../app/Controllers/Http/CursoController");
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
  Route.resource('usuarios', 'UsuarioController');
  Route.resource('cursos', 'CursoController');
  Route.resource('disciplinas', 'DisciplinaController')
  .validator(new Map([
    [['disciplinas.store'], ['Disciplina']],
  ]));
  Route.resource('noticias', 'NoticiaController')
  .validator(new Map([
    [['noticias.store'], ['Noticia']],
  ]));
}).prefix("api");
