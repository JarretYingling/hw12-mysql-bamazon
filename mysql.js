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
    log(`\nWelcom to ${database}\nYou are logged in as id ${connection.threadId}\n`);
    // runSelectQuery();
    // don't connection.end() until all connection.query() completed
});

// singular export
module.exports.connection = connection;

// multiple exports
// module.exports.example_01 = example_01;
// module.exports.example_02 = example_02;