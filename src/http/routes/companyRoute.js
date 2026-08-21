const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');
const { createCompanyValidator, updateCompanyValidator } = require('../validators/companyValidator');

router.get('/', CompanyController.index);
router.get('/:id', CompanyController.show);
router.post('/', createCompanyValidator, CompanyController.store);
router.put('/:id', updateCompanyValidator, CompanyController.update);
router.delete('/:id', CompanyController.destroy);

module.exports = router;