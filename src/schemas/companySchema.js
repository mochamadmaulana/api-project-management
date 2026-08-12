const createCompanySchema = {
  body: {
    type: 'object',
    props: {
      name: 'string|min:3',
    },
  },
  $$strict: false,
};

const updateCompanySchema = {
  params: {
    type: 'object',
    props: {
      id: 'string|numeric',
    },
  },
  body: {
    type: 'object',
    props: {
      name: 'string|min:3',
    },
  },
  $$strict: false,
};

const deleteCompanySchema = {
  params: {
    type: 'object',
    props: {
      id: 'string|numeric',
    },
  },
  $$strict: false,
};

module.exports = {
  createCompanySchema,
  updateCompanySchema,
  deleteCompanySchema,
};