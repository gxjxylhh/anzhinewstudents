//  index.js at root

const {exec} = require('child_process');
const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const CONNECTION_URL = "mongodb+srv://Ricky:12321@anzhiedu-cowhp.mongodb.net/test?retryWrites=true&w=majority";
//const csv = require('csvtojson');
const path = require('path');
var app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');

var fs = require('fs');

const total = 27;//this is temp value
var ls = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var database, collection;
//default database name and collection name
//remember to change when needed
var DATABASE_NAME = "usyd";
var tempCollectionName = "courses";



app.use((request, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

// Serve static files from the React frontend app

app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html


const PORT = process.env.PORT || 5000;

function handleSendEmail(req,res) {

    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'richardguo495@gmail.com', // Your email id
            pass: 'ad55085874'
        }
    });
    var mailOptions = {
        from: 'richardguo495@gmail.com', // sender address
        to: '353583240@qq.com', // list of receivers
        subject: 'Latest students info from Anzhi Edu', // Subject line
        attachments:[{ filename: 'anzhistudentsinfo.csv', path: __dirname + '/anzhistudentsinfo.csv' }],
        html: '<!DOCTYPE html>'+
            '<html><head><title>学生信息</title>'+
            '</head><body><div>'+
            '<p>附件csv</p>'+
            '</div></body></html>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            //res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            //res.json({yo: info.response});
        };
    });
}

app.listen(PORT, () => {
    //helperfunc();
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if (error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("Initial Connected to " + DATABASE_NAME);
        console.log("Initial Connected to " + tempCollectionName);
        //console.log("Connected to `"+collection);
    });
    exec("mongoexport --host AnzhiEdu-shard-0/anzhiedu-shard-00-00-cowhp.mongodb.net:27017 --ssl --username Ricky --password 12321 --authenticationDatabase admin --db Students --collection info --type csv --out anzhistudentsinfo.csv -f studentname,phonenumber,majorname,course1,course2,course3,course4", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    handleSendEmail();
});






//not using anymore
/*
app.get("/api/uni/:q1/", cors(), async (req, res, next) => {
    try{
        //const text = req.params.;

        //console.log(text+"oho`~~~~");

    }catch (err) {
        next(err)

    }
    console.log("in backend ~~~oho`~~~~");
});
*/
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

app.post("/api/submitinfo", (request, response) => {
    DATABASE_NAME = "Students";
    tempCollectionName = "info";
    //data from frontend
    console.log(request.body);
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log("post Connected to " + DATABASE_NAME);
        console.log("post Connected to " + tempCollectionName);        //console.log("Connected to `"+collection);
        collection.insertOne(request.body, (error, result) => {
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

app.get("/api/search/:q1/", (request, response) => {
    //set back to courses entry
    tempCollectionName = "courses";
    let url = require('url');
    //let url_parts =url.parse(request.url, true).pathname ;
    //let pathnamestring = url_parts.pathname;
    let keywords = String(url.parse(request.url, true).pathname);
    keywords = keywords.replace("/api", '');
    keywords = keywords.replace("/search/", '');
    keywords = keywords.replace("%20", ' ');
    //if matches usyd
    if (keywords.match(/usyd.*/)) {
        DATABASE_NAME = "usyd";
        keywords = keywords.replace("usyd", '');
        console.log("matching usyd");
    }
    //for uts
    else if (keywords.match(/uts.*/)) {
        DATABASE_NAME = "uts";
        keywords = keywords.replace("uts", '');
        console.log("matching uts");
    }
    //for unsw
    else if (keywords.match(/unsw.*/)) {
        DATABASE_NAME = "unsw";
        keywords = keywords.replace("unsw", '');
        console.log("matching unsw");
    }
    keywords = keywords.replace("%20", ' ');


    console.log("searching keyword is : " + keywords);
    //Drives me nuts here,direct casting does not let you do comparison inside find()!
    //However when re-initialisation, with searchQuery it works!
    var searchQuery = {major: keywords};
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if (error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(tempCollectionName);
        console.log(" Connected to " + DATABASE_NAME);
        console.log(" Connected to " + tempCollectionName);

        collection.find(searchQuery).toArray((error, result) => {
            //console.log(query+"this is key words");
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });

    //MongoClient.close();

});

//This is used to find all records that satisfy no certain conditions, should never be called, except for testing
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

// Anything that doesn't match the above, send back the index.html file
//Note: this has be at the bottom

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
