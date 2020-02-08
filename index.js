//  index.js at root


const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
const csv = require('csvtojson');
const path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var database, collection;
//default database name and collection name
var DATABASE_NAME = "example";
var tempCollectionName = "people";

app.use((request, response, next) => {

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
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


//-------------

//this is used to find records that satisfy certain conditions as example
app.get("/accounts/id371138", (request, response) => {
    collection.find({"account_id": 371138}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//app.get('/',(req,res)=>res.send('working'));

//single insert

app.post("/test", (request, response) => {

    collection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });

    //可以在不同函数重复连接mongoClient,只需要修改DATABASE_NAME和tempCollectionName即可
    /*
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

    */
});


//multiple insert
//will change to jsonObj that can load csv file later
app.post('/insertmany', (request, response) => {
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


app.get("/search/:q1/", (request, response) => {
    let url = require('url');
    let url_parts = url.parse(request.url, true);
    let pathnamestring = url_parts.pathname;
    let keywords = String(pathnamestring);
    keywords = keywords.replace("/search/", '');
    console.log("searching keyword is : "+keywords);
    //Drives me nuts here,direct casting does not let you do comparison inside find()!
    //However when re-initialisation, with searchQuery it works!
    var searchQuery = {studentname: keywords};
    collection.find(searchQuery).toArray((error, result) => {
        //console.log(query+"this is key words");
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//This is used to find all records that satisfy no certain conditions
//app.get("/watch/:q1/:q2", (request, response) => {
app.get("/search/", (request, response) => {

    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        console.log(result);
        console.log("above from backend");
        //response.sendfile(path,option,callback)(res)
        //response.sendfile(path.resolve('index.html'))(result);
        response.send(result);
    });

});