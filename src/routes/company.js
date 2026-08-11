const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { createCompanySchema, updateCompanySchema, deleteCompanySchema } = require('../schemas/companySchema');
const { getAllCompanies, createCompany, getCompanyById, updateCompany, deleteCompany } = require('../controllers/companiesController');

router.get('/', getAllCompanies);
router.post('/', validate(createCompanySchema), createCompany);
router.get('/:id', getCompanyById);
router.put('/:id', validate(updateCompanySchema), updateCompany);
router.delete('/:id', validate(deleteCompanySchema), deleteCompany);

module.exports = router;