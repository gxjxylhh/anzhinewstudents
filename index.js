//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority
`);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});