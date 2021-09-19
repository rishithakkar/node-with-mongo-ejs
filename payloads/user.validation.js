const Joi = require("joi");
const { validateRequest } = require("../utils/validation");

exports.signupValidation = (req, res, next) => {
  const schemaRules = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.number().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirm_password: Joi.string().valid(Joi.ref("password")),
    //.error(() => new Error("Password and confirm password does not match")),
  };

  const schema = Joi.object(schemaRules).with("password", "confirm_password");
  validateRequest(req, next, schema);
};

exports.signinValidation = (req, res, next) => {
  const schemaRules = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
};

exports.updateUserValidation = (req, res, next) => {
  const schemaRules = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    contact: Joi.number().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
};
