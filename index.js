const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URL
)
.then(() => 
  console.log('DB connection successfull'))
.catch((err) => {
  console.log('Error: ',err)
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log("Backend server is running on port 3000")
});
