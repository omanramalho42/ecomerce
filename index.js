const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.listen(3000, () => {
  console.log("Backend server is running on port 3000")
});
