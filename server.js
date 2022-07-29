const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require('./routes/users');

require("dotenv").config(); //The dotenv file has our environmental variables

// Create Express Server
const app = express();
const PORT = process.env.PORT || 5000;
var logNo = 0;

// app.get('/',(req, res) => {
//     console.log('Nalin');
//     res.render('home')
// })

app.use(cors()); //Cors middleware
app.use(express.json()); //This allows us to parse json
app.use('/uploads', express.static('uploads'));   //ignores /uploads in url

//  Connect to MongoDB database.
const URI = process.env.ATLAS_URI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

//  listen for 'error' event 'on' the 'connection', if 'error' execute the arrow function.
connection.on("error", (err) => {
  logNo++;
  console.log(`${logNo}>> Error while connecting to MongoDB database. ${err}`);
});
//  listen for 'disconnected' event 'on' the 'connection', if 'disconnected' execute the arrow function.
connection.on("disconnected", () => {
  logNo++;
  console.log(`${logNo}>> Connection to MongoDB database lost.`);
});
//  listen for 'reconnect' event 'on' the 'connection', if 'reconnect' execute the arrow function.
connection.on("reconnect", () => {
  logNo++;
  console.log(`${logNo}>> Re-Connected to MongoDB database.`);
});
//  'once' the 'connection' is 'open', execute the arrow function.
connection.once("open", () => {
  logNo++;
  console.log(
    `${logNo}>> MongoDB database connection successfully established.`
  );
});

//  Middleware
app.use(cors());
app.use(express.json()); //  Originally >app.use(bodyParser.json());< but now is included in express.

app.use('/users', usersRouter);

//  Function to start Server and listen to port no PORT.
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}.`);
});
