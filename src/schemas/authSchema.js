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

const registerSchema = {
  body: {
    type: 'object',
    props: {
      name: 'string|min:3',
      email: 'email|min:3',
      password: 'string',
      role_id: 'number',
      company_name: 'string|min:3',
      company_email: 'email|optional|nullable',
      company_telephone: 'string|numeric|optional|nullable',
      company_address: 'string|numeric|optional|nullable'
    },
  },
  $$strict: false,
};

module.exports = {
  loginSchema,
  registerSchema
};