const express = require('express');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const app = express();
const port = 3000;

app.use((req, res, next) => {  //CORS
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  next();
});

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

// for parsing multipart/form-data
app.use(upload.array()); 
// Use the haiku routes

const haikuRoutes = require('./routes/haikuRoutes');


app.use('/haiku', haikuRoutes); // localhost:3000/haiku/


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
