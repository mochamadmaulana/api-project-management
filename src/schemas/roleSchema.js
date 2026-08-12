const createRoleSchema = {
  body: {
    type: 'object',
    props: {
      name: 'string|min:3',
    },
  },
  $$strict: false,
};

const updateRoleSchema = {
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

const deleteRoleSchema = {
  params: {
    type: 'object',
    props: {
      id: 'string|numeric',
    },
  },
  $$strict: false,
};

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  deleteRoleSchema,
};