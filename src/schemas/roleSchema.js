const createRoleSchema = {
  body: {
    type: 'object',
    props: {
      name: {
        type: "string",
        empty: false,
        min: 3,
        messages: {
          required: 'The name field is required.',
          stringEmpty: 'The name field is required.',
          stringMin: 'The name field must be at least 3 characters.'
        }
      },
    },
  },
  $$strict: false,
};

const updateRoleSchema = {
  params: {
    type: 'object',
    props: {
      id: {
        type: 'number',
        convert: true,
        integer: true,
        positive: true,
        messages: {
          number: 'The params id must be a numeric value.',
          numberInteger: 'The params id must be an integer.',
          numberPositive: 'The params id must be a positive number.'
        }
      }
    },
  },
  body: {
    type: 'object',
    props: {
      name: {
        type: "string",
        empty: false,
        min: 3,
        messages: {
          required: 'The name field is required.',
          stringEmpty: 'The name field is required.',
          stringMin: 'The name field must be at least 3 characters.'
        }
      },
    },
  },
  $$strict: false,
};

const deleteRoleSchema = {
  params: {
    type: 'object',
    props: {
      id: {
        type: 'number',
        convert: true,
        integer: true,
        positive: true,
        messages: {
          number: 'The params id must be a numeric value.',
          numberInteger: 'The params id must be an integer.',
          numberPositive: 'The params id must be a positive number.'
        }
      }
    },
  },
  $$strict: false,
};

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  deleteRoleSchema,
};