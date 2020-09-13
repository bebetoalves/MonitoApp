const { ioc } = require("@adonisjs/fold");
const { hooks } = require("@adonisjs/ignitor");
const Moment = use("moment");

const alphaSpace = async (data, field, message, args, get) => {
  const value = get(data, field)

  if (!value) {
    /**
     * skip validation if value is not defined. `required` rule
     * should take care of it.
     */
    return
  }

  if ((/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/g).test(value) === false) {
    throw message;
  }
};

const birthday = async (data, field, message, args, get) => {
  const value = get(data, field)

  if (!value) {
    /**
     * skip validation if value is not defined. `required` rule
     * should take care of it.
     */
    return
  }

  const date = Moment(value, 'DD/MM/YYYY', true);

  if (date.isValid() === false) {
    throw message;
  }
};

hooks.after.providersRegistered(() => {
  const Validator = ioc.use("Validator");
  Validator.extend("alphaSpace", alphaSpace);
  Validator.extend("birthday", birthday);
});
