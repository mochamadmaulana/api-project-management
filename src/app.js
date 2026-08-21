require('dotenv').config();
const express = require('express');
const app = express();

const companyRouter = require('./http/routes/companyRoute')
const roleRouter = require('./http/routes/roleRoute')

app.use('/v1/company', companyRouter);
app.use('/v1/role', roleRouter);

module.exports = app
