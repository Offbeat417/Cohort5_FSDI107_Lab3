/*WEB SERVER FUNCTIONALITY*/ 

var http = require("http");
var express = require("express");

var app = express();

//Enable CORS security
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});//this essentially allows everyone to access the innards of my computer


app.get("/",function(req,res){
    res.send("<h1 style='color:darkblue'>Hello from my own Server</h1>");
})



app.get("/contact", function (req, res) {
    res.send("My contact info is 808-888-9148, william.i.reediv@gmail.com")
})//keep in mind, each / dicates a new page

app.get("/about", function (req, res){
    res.send("My name is William, the fourth of my name");
})



//local IP Address: 127..0.0.1 = my machine
//8080 = a port


//read req body as obj
var bodyParser = require("body-parser");
app.use(bodyParser.json()); //using the body-Parser to read JSON files
//now we can read data that the client is sending.
//the server can read the data the client is sending, specifically

var mongoose = require("mongoose");
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
);
var db = mongoose.connection;

//DB obj 
var itemDB


//*API FUNCTIONALITY*/
var items = [];
var count = 0;

app.get('/api/products', function (req,res){
    console.log("User wants the catalog");

    ItemDB.find({}, function(error, data){
        if(error){
            console.log("** Error on retreiving **", error);
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(data);
    });
});

app.get('/api/products/:user' function(req,res){
    var name = req.params.user;

    ItemDB.find({}, function(error,data));
});

app.post('/api/products', function (req,res){
    console.log("User wants to save item");

    //perform validation
    

    //create a DB object
    var ItemForMongo = ItemDB(req.body);
    ItemForMongo.save(function(error, saveItem){
        if(error){
            console.log("** Error saving item to DB **", error);
            res.status(500); //Internal Server Error
            res.send(error);
        }

        //no error, send the saved item back to client
        res.status(201); //means find, it's created.
        res.json(saveItem);
    });
});


// catch error on mongo connection
db.on('error', function(error){
    console.log("** Error connecting to MongoDB **");
});

//catch success on mongo connection
db.on('open', function(){
    console.log("** Successfully connected to MongoDB **");

    /*The allows schema types are:
    string, number, data, buffer, boolean, mixed, objectID, Array */
    
    //define an schema for the collection (Table)
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        image: String,
        user: String

    });
    //create consttructor(s) for the schema(s)
    ItemDB = mongoose.model("itemCH5", itemSchema);
})



app.listen(8080, function () {
    console.log("<Server running at http://localhost:8080");
});