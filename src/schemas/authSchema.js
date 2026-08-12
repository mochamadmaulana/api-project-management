const loginSchema = {
  body: {
    type: 'object',
    props: {
      email: 'email',
      password: 'string'
    },
  },
  $$strict: false,
};

module.exports = {
  loginSchema,
};