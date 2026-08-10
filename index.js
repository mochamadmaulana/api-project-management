require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const rolesRouter = require('./src/routes/roles');

const app = express();

app.use(cors({
  // allowed http method
  methods: "GET,POST,PUT,DELETE"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Endpoint root "localhost:3000/api/v1/role"
app.use('/api/v1/role', rolesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});