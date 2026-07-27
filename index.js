const express = require("express");

const app = express();

app.use(() => {
  console.log("Server running port 3000");
})

app.listen(3000);