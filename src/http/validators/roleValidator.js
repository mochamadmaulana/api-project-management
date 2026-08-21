const { body, validationResult } = require('express-validator');
const { ValidationError } = require('../../utils/appError');
const { isUnique } = require('../../utils/customValidators');

const formatErrors = (errors) => {
  return errors.reduce((acc, err) => {
    const fieldName = err.path;

    if (!acc[fieldName]) {
      acc[fieldName] = err.msg;
    }

    return acc;
  }, {});
};

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = formatErrors(errors.array());
    return next(new ValidationError(formattedErrors));
  };
};

const createRoleValidator = validate([
  body('name')
    .trim()
    .notEmpty().withMessage('The name field is required.')
    .isLowercase().withMessage('The name field must be lowercase.')
    .isLength({ min: 3 }).withMessage('The name field must be at least 3 characters.')
    .matches(/^\S+$/).withMessage('The name cannot contain spaces.')
    .custom(isUnique('roles', 'name', 'id')),
]);

const updateRoleValidator = validate([
  body('name')
    .trim()
    .notEmpty().withMessage('The name field is required.')
    .isLowercase().withMessage('The name field must be lowercase.')
    .matches(/^\S+$/).withMessage('The name field cannot contain spaces.')
    .isLength({ min: 3 }).withMessage('The name field must be at least 3 characters.')
    .custom(isUnique('roles', 'name', 'id')),
]);

module.exports = {
  createRoleValidator,
  updateRoleValidator,
};