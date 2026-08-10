const { z } = require('zod');

const createRoleSchema = z.object({
  body: z.object({
    name: z.string({
      error: (iss) => iss.input === undefined ? "Field is required." : "Invalid input."
    })
      .min(3, "Field minimum 3 characters")
  })
});

module.exports = {
  createRoleSchema
};