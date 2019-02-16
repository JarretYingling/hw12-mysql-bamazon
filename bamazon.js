"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// get mysql connection
const query = require("./query.js");
// get inventory
// const inventory = require("./query.js").inventory;

// get inquirer questions
const ask = require("./inquirer.js").ask;

query.resetInventory();




/*
const checkInventory = (answers, inventory) => {
    log(answers);
    log(inventory)
}
*/