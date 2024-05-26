const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const documentRouter = require("./routes/document");
const cors = require("cors");
const socket_io = require("socket.io");

const PORT = 10000;
const DB = "mongodb+srv://razken-hash:a8Tx6Oj4SojxZ2ca@tera-cluster.qoyzisk.mongodb.net/?retryWrites=true&w=majority&appName=tera-cluster";

mongoose.connect(DB).then(() => {
    console.log("Connection To MongoDB Established!");
});

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(documentRouter);

const server = http.createServer(app);

const socketIO = socket_io(server);

socketIO.on(
    "connection", (socket) => {
        socket.on("join", (documentId) => {
            console.log("Joined");
        });

        socket.on("typing", (data) => {
            console.log(data);
            socket.broadcast.emit("changes", data)
        });
    },
);

server.listen(PORT, "0.0.0.0", () => {
    console.log("HELLO TERA!");
})

