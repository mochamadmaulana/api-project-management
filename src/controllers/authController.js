const { User, Company, Role } = require('../models');
const bcrypt = require('bcrypt');

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({
      attributes: { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] },
      where: { email }
    })

    if (!userExist) {
      return res.status(400).json({
        status: 'error',
        message: 'Login failed, please check your email or password.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Login successfully.',
      data: userExist,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

const authRegister = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role_id, 
      company_name, 
      company_email, 
      company_telephone, 
      company_address 
    } = req.body;
    
    const userExist = await User.findOne({
      where: { email }
    })

    if (userExist) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request, Something wrong.',
        errors: [
          {
            type: "unique",
            request: "body",
            field: "email",
            message: "The 'email' field is already registered."
          }
        ]
      });
    }
    
    const companyExist = await Company.findOne({
      where: { name: company_name }
    })
    
    if (companyExist) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request, Something wrong.',
        errors: [
          {
            type: "unique",
            request: "body",
            field: "company",
            message: "The 'company' field is already registered."
          }
        ]
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createCompany = await Company.create({
      name: company_name,
      email: company_email,
      telephone: company_telephone,
      address: company_address,
    });

    const createUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role_id, 
      company_id: createCompany.id
    });

    const responseUser = await User.findByPk(createUser.id, {
      attributes: { exclude: ['password', 'deleted_at'] }
    });

    return res.status(201).json({
      status: "success",
      message: 'Register successfully.',
      data: responseUser
    })

  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = {
  authLogin,
  authRegister
}