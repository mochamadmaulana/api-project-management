require('dotenv').config();
const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json());

// Dummy endpoint root method GET
app.get("/", (req, res, next) => {
  res.json({
    message: "API Success applyed."
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});