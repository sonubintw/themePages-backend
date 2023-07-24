// server.js
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const socketIO = require('socket.io');


const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv").config();
const port = process.env.PORT || 8000;
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandlerMiddleware");
const themeRoutes = require("./routes/themeRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use(function (req, res, next) {
    req.io = io;
    next();
});


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, { cors: { origin: '*' } });




app.use(cors());
// Start the server with the Socket.IO integrated HTTP server

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/theme", themeRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server working successfully");
}).catch((err) => {
    console.log(`Something is not good ${err}`);
});
