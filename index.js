require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const rolesRouter = require('./src/routes/roles');
const companiesRouter = require('./src/routes/company');
const authenticationRouter = require('./src/routes/auth');

const app = express();

app.use(cors({
  // allowed http method
  methods: "GET,POST,PUT,DELETE"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/role', rolesRouter);
app.use('/api/v1/company', companiesRouter);
// app.use('/api/v1/auth', authenticationRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});