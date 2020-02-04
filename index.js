//  index.js at root



const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

const axios = require('axios');

const mongoose = require('mongoose');

const MongoClient = require("mongodb").MongoClient;

const bodyParser = require('body-parser');
//const taskController = require("./controllers/TaskController");
const DATABASE_NAME = "example";

//const DATABASE_NAME = "sample_analytics";
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
const ObjectId = require("mongodb").ObjectID;



var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




var database, collection;
var tempCollectionName = "people";

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("Connected to " + DATABASE_NAME);
        //console.log("Connected to `"+collection);
    });
});

//person
app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if (error) {
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


//This is used to find all records that satisfy no certain conditions
app.get("/accounts", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//-------------

//this is used to find records that satisfy certain conditions
app.get("/accounts/id371138", (request, response) => {
    collection.find({"account_id": 371138}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get('/',(req,res)=>res.send('working'));


app.get('/test',(req,res)=>{

    console.log(req.data);
    console.log(res.data);
    res.send('working');
});

