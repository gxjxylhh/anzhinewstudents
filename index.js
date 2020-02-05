//  index.js at root



const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

const axios = require('axios');

const mongoose = require('mongoose');

const MongoClient = require("mongodb").MongoClient;

const bodyParser = require('body-parser');
//const taskController = require("./controllers/TaskController");
var DATABASE_NAME = "example";

//const DATABASE_NAME = "sample_analytics";
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
const ObjectId = require("mongodb").ObjectID;

//const csvFilePath='models/usydstats.csv';
const csv=require('csvtojson');

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

//single insert
/*
app.post('/test',(request,response)=>{
    console.log(request.body);
    collection.insert(request.body, (err, response) => {
        if (error) {
            return request.status(500).send(err);
        }
        response.send(response.response);
    });
    //console.log("ee");
    //res.send('working');
});
*/
app.post("/test", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });

    //可以在不同函数重复连接mongoClient,只需要修改DATABASE_NAME和tempCollectionName即可
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }
        DATABASE_NAME = "sample_analytics";
        tempCollectionName = "accounts";
        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("Connected to " + DATABASE_NAME);
        //console.log("Connected to `"+collection);
    });
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = ...;

//used for transform data
// const client = new MongoClient(uri, {useNewUrlParser: true});
//
// const csvFilePath='model/weather.csv';
// const csv=require('csvtojson');
// csv()
//     .fromFile(csvFilePath)
//     .then((jsonObj)=>{
//         console.log(jsonObj);
//         client.connect(err => {
//             const collection = client.db("hackrpi").collection("pastdata");
//             // perform actions on the collection object
//             collection.insertMany(jsonObj, function (err, result) {
//
//                 console.log("Inserted 3 documents into the collection");
//                 console.log(result);
//             });
//             client.close();
//         });
//     });


//multiple insert
//will change to jsonObj that can load csv file later
app.post('/insertmany',(request, response)=>{
    /*
    not needed anymore

    csv()
        .fromFile(csvFilePath)
        //.then((jsonObj)=>{
        .then((jsonObj)=>{
            console.log(jsonObj);

            // perform actions on the collection object
            collection.insertMany(jsonObj, function (error, result) {
                if (error) {
                    return response.status(500).send(error);
                }
                console.log("Inserted 3 documents into the collection");
                console.log(result);
                //response.send(result.result);
            });

        });

    */


});

//This is used to find all records that satisfy no certain conditions
app.get("/watch", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        console.log(result);
        console.log("above from backend");
        response.send(result);
    });
});