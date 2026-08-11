const { z } = require('zod');

const createCompanySchema = z.object({
  body: z.object({
    name: z.string({
      error: (iss) => iss.input === undefined ? "Input is required." : "Invalid input."
    })
      .min(3, "Input minimum 3 characters")
  })
});

const updateCompanySchema = z.object({
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

const deleteCompanySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Params ID must be numeric.")
  }),
});

module.exports = {
  createCompanySchema,
  updateCompanySchema,
  deleteCompanySchema
};