const { z } = require('zod');

const createRoleSchema = z.object({
  body: z.object({
    name: z.string({
      error: (iss) => iss.input === undefined ? "Input is required." : "Invalid input."
    })
      .min(3, "Input minimum 3 characters")
  })
});

const updateRoleSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Params ID must be numeric.")
  }),
  body: z.object({
    name: z.string({
      error: (iss) => iss.input === undefined ? "Input is required." : "Invalid input."
    })
      .min(3, "Input minimum 3 characters")
  })
});

const deleteRoleSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Params ID must be numeric.")
  }),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  deleteRoleSchema
};