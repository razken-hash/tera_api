const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const PORT = 2020;

const DB = "mongodb+srv://razken-hash:a8Tx6Oj4SojxZ2ca@tera-cluster.qoyzisk.mongodb.net/?retryWrites=true&w=majority&appName=tera-cluster";

mongoose.connect(DB).then(() => {
    console.log("Connection To MongoDB Established!");
})

const app = express();

app.listen(PORT, "0.0.0.0", () => {
    console.log("HELLO TERA!");
    console.log("HI");
})

