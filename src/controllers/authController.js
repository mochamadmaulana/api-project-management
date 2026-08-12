const { User } = require('../models');

// const authLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = User.findOne({
//       where: { email },
//     }),

//     return res.status(200).json({
//       status: 'success',
//       message: 'Get all data successfully.',
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// module.exports = {
//   authLogin,
// };