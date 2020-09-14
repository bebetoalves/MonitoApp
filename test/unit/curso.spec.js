"use strict";

const { test } = use("Test/Suite")("Curso (Unitário)");
const { validate } = use("Validator");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Curso = use("App/Models/Curso");

const CursoValidator = use("App/Validators/Curso");

test("um curso deve conter um nome", async ({ assert }) => {
  const data = {
    nome: "",
  };

  const validacao = await validate(
    data,
    new CursoValidator().rules,
    new CursoValidator().messages
  );

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [
    {
      field: "nome",
      validation: "required",
      message: "Este campo é obrigatório",
    },
  ]);
});

test("o nome de um curso deve ter no mínimo 10 caracteres", async ({
  assert,
}) => {
  const data = {
    nome: "abcd",
  };

  const validacao = await validate(
    data,
    new CursoValidator().rules,
    new CursoValidator().messages
  );

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [
    {
      field: "nome",
      validation: "min",
      message: "Este campo deve ter no mínimo 10 caracteres",
    },
  ]);
});
