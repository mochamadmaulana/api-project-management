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

const createCompanyValidator = validate([
  body('name')
    .trim()
    .notEmpty().withMessage('The name field is required.')
    .custom(isUnique('companies', 'name')),
  body('email')
    .trim()
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isEmail().withMessage('The email field must be a valid email address.')
    .custom(isUnique('companies', 'email')),
  body('telephone')
    .trim()
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isLength({ min: 10 }).withMessage('The telephone field must be at least 10 characters.'),
  body('address')
    .trim()
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isLength({ max: 500 }).withMessage('The address field must be less than 500 characters'),
]);

const updateCompanyValidator = validate([
  body('name')
    .trim()
    .notEmpty().withMessage('The name field is required.')
    .custom(isUnique('companies', 'name', 'id')),
  body('email')
    .trim()
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isEmail().withMessage('The email field must be a valid email address.')
    .custom(isUnique('companies', 'email', 'id')),
  body('telephone')
    .trim()  
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isLength({ min: 10 }).withMessage('The telephone field must be at least 10 characters.'),
  body('address')
    .trim()
    .optional({ 
      nullable: true,
      checkFalsy: true 
    })
    .isLength({ max: 500 }).withMessage('The address field must be less than 500 characters'),
]);

module.exports = {
  createCompanyValidator,
  updateCompanyValidator,
};