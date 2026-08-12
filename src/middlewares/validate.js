const Validator = require('fastest-validator');
const v = new Validator();

const validate = (schema) => {
  const check = v.compile(schema);

  return (req, res, next) => {
    const result = check({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (result !== true) {
      return res.status(400).json({
        status: 'error',
        errors: result.map((err) => ({
          type: err.type,
          request: err.field.split(".")[0],
          field: err.field.split(".").pop(),
          message: err.message.replace(/(body|query|params)\./g, ''),
        })),
      });
    }

    next();
  };
};

module.exports = validate;