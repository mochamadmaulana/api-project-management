require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const appsRouter = require('./src/app');
const handleError = require('./src/utils/handleError');

const app = express();

app.use(cors({
  // allowed http method
  methods: "GET,POST,PUT,DELETE"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', appsRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});