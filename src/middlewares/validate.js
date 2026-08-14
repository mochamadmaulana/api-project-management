const Validator = require('fastest-validator');
const v = new Validator();

const formatErrors = (errors) => {
  return errors.reduce((acc, err) => {
    const fieldName = err.field.replace(/^(body|query|params)\./, '');

    if (!acc[fieldName]) {
      acc[fieldName] = err.message.replace(/(body|query|params)\./g, '');
    }

    return acc;
  }, {});
};

const validate = (schema) => {
  const check = v.compile(schema);

  return (req, res, next) => {
    const result = check({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (result !== true) {
      return res.status(422).json({
        message: 'Unprocessable Entity.',
        errors: formatErrors(result),
      });
    }

    next();
  };
};

module.exports = validate;