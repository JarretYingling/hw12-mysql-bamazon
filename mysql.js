"use strict";
// toggle debug mode from debud.js
const log = require("./config.js").log;

// global npm install directory
const npmGlobalInstallDir = require("./config.js").npmGlobalInstallDir;

//require mysql for database access
const mysql = require(`${npmGlobalInstallDir}mysql`);

// require dotenv for local environemnt variables
const dotenv = require(`${npmGlobalInstallDir}dotenv`)
    .config({
        //symlink git = /Users/macos_highsierra_ss/git
        path: 'git/.env'
    });
// dotenv error handling
if (dotenv.error) throw dotenv.error

const database = process.env.MYSQL_DATABASE;

// mysql connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// single connection.connect()
// can run multiple connection.query()
// until connection.end()
connection.connect(function (err) {
    if (err) throw err;
    log("\n\n\nWELCOME TO BAMAZON!\n\nWe have the BEST selection of\nJavascript variables AND functions!!!\n");
    // don't connection.end() until all connection.query() completed
});

module.exports.connection = connection;