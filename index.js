//  index.js at root

const express = require('express');
const mongoose = require('mongoose');

const MongoClient = require("mongodb").MongoClient;

const bodyParser = require('body-parser');
//const taskController = require("./controllers/TaskController");
const DATABASE_NAME = "sample_analytics";
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
const ObjectId = require("mongodb").ObjectID;

var app = express();

//mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority
//`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var database,collection;
app.listen(5000,()=>{
  MongoClient.connect(CONNECTION_URL,{useNewUrlParser:true},(error,client)=>{
    if(error){
      throw error;
    }
    database = client['__DATABASE_NAME__'];
    //collection = database.collection("accounts");
    console.log("Connected to `"+database);
    //console.log("Connected to `"+collection);

  });
});


app.post("/person", (request, response) => {
  collection.insert(request.body, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});
app.get("/people", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});





/*
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`backend running on port ${PORT}`)
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}


app
    .route("/tasks")
    .get(taskController.listAllTasks)
    .post(taskController.createNewTask);

app
    .route("/tasks/:taskid")
    .get(taskController.readTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);
*/


