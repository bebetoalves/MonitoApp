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
  Route.get("user", "UserController.index");
  Route.get("user/:id", "UserController.show");
  Route.post("user", "UserController.store");
  Route.patch("user/:id", "UserController.update");
  Route.delete("user/:id", "UserController.destroy");
}).prefix("api");

Route.group(() => {
  Route.post("cursos", "CursoController.store");
  Route.get("cursos", "CursoController.index");
  Route.get("curso/:id", "CursoController.show");
  Route.patch("curso/:id", "CursoController.update");
  Route.delete("curso/:id", "CursoController.destroy");
}).prefix('api')

Route.post('/disciplinas', 'DisciplinaController.store')
Route.get('/disciplina/:id', 'DisciplinaController.show')
Route.get('/disciplinas', 'DisciplinaController.index')
Route.delete('/disciplina/:id', 'DisciplinaController.destroy')
Route.put('/disciplina/:id', 'DisciplinaController.update')

