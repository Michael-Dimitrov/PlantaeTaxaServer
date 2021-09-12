require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongoose');

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//Connect to mongoDB
mongo.connect(process.env.CONNECTION_STRING, 
    {   useUnifiedTopology: true,
        useNewUrlParser: true,
}).then(client => {
    console.log('Connected to Database');
}).catch(error => console.error(error));

mongo.set('useFindAndModify', false);

// Check that we connected to the db
var db = mongo.connection;
if(!db)
    console.log("Unable to connect to database.");
else
    console.log("Connected to datbase.");

// Set up the port
var port = process.env.PORT;
app.listen(port, function() {
    console.log('listening on '+ port);
})

//Default route
app.get('/', (req, res) => { res.send('Hello World'); })

//Import Routes
let apiRoutes = require('./api/api-routes.js');
app.use('/api', apiRoutes);

