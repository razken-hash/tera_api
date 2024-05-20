const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const PORT = 2020;

const app = express();

app.listen(PORT, "0.0.0.0", () => {
    console.log("HELLO TERA!");
    console.log("HI");
})

