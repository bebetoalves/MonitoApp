"use strict";

const { test } = use("Test/Suite")("Disciplina (Unitário)");
const { validate } = use("Validator");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Disciplina = use("App/Models/Disciplina");

const DisciplinaValidator = use("App/Validators/Disciplina");


test("uma disciplina deve conter um nome", async ({ assert }) => {
  const data = {
    nome: "",
  };

  const validacao = await validate(
    data,
    new DisciplinaValidator().rules,
    new DisciplinaValidator().messages
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

test("o nome de uma disciplina deve ter no mínimo 5 caracteres", async ({
  assert,
}) => {
  const data = {
    nome: "abcd",
  };

  const validacao = await validate(
    data,
    new DisciplinaValidator().rules,
    new DisciplinaValidator().messages
  );

  assert.isTrue(validacao.fails());

  assert.deepEqual(validacao.messages(), [
    {
      field: "nome",
      validation: "min",
      message: "Este campo deve ter no mínimo 5 caracteres",
    },
  ]);
});
