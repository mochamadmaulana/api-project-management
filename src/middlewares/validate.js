const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const issues = result.error.issues || result.error.errors || [];
    return res.status(400).json({
      status: 'error',
      errors: issues.map((err) => ({
        field: err.path.join('.').replace(/^(body|query|params)\./, ''),
        message: err.message,
      })),
    });
  }

  next();
};

module.exports = validate;