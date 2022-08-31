const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(
  process.env.MONGO_URL
)
.then(() => 
  console.log('DB connection successfull'))
.catch((err) => {
  console.log('Error: ',err)
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Backend server is running on port 3000")
});
