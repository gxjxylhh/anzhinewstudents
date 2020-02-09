//  index.js at root


const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
//const csv = require('csvtojson');
//const path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var database, collection;
//default database name and collection name
//remember to change when needed
var DATABASE_NAME = "";
var tempCollectionName = "courses";

app.use((request, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});


const PORT = process.env.PORT || 5000;

//helperfunction to change databse entry

function helperfunc(){
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("Connected to " + DATABASE_NAME);
        //console.log("Connected to `"+collection);
    });

};

app.listen(PORT, () => {
    //helperfunc();
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

app.get("/uni/:q1/", (request, response) => {
    let url = require('url');
    //let url_parts =url.parse(request.url, true).pathname ;
    //let pathnamestring = url_parts.pathname;
    let keywords = String(url.parse(request.url, true).pathname);
    keywords = keywords.replace("/uni/", '');
    keywords = keywords.replace("%20", ' ');
    keywords.toLowerCase();
    console.log("uni keyword is : " + keywords);
    DATABASE_NAME = keywords;
    tempCollectionName = "courses";
    //helperfunc();
    //response.send(keywords);
    //MongoClient.close();
    helperfunc();

});

//-------------

//this is used to find records that satisfy certain conditions as example
//just example
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

app.post("/submitinfo", (request, response) => {
    DATABASE_NAME = "Students";
    tempCollectionName = "info";
    //data from frontend
    console.log(request.body);
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("Connected to " + DATABASE_NAME);
        //console.log("Connected to `"+collection);
        collection.insert(request.body, (error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result.result);
        });

    });

});


//multiple insert
//will change to jsonObj that can load csv file later
/*
app.post('/insertmany', (request, response) => {


    csv()
        .fromFile('/Users/Richrad/Documents/anzhinewstudents/models/utsstats.csv')
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

});
*/

app.get("/search/:q1/", (request, response) => {
    let url = require('url');
    //let url_parts =url.parse(request.url, true).pathname ;
    //let pathnamestring = url_parts.pathname;
    let keywords = String(url.parse(request.url, true).pathname);
    keywords = keywords.replace("/search/", '');
    keywords = keywords.replace("%20", ' ');
    console.log("searching keyword is : " + keywords);
    //Drives me nuts here,direct casting does not let you do comparison inside find()!
    //However when re-initialisation, with searchQuery it works!
    var searchQuery = {major: keywords};
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


//works
/*
app.get("/search/:qname", (request, response) => {

    collection.find({"studentname":qname}).toArray((error, result) => {
        //console.log(query+"this is key words");
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
    console.log(request.params.qname+"is");
    //response.send(response);

    response.send("ss");
});

 */
