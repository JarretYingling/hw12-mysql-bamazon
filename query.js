"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// get mysql connection
const db = require("./mysql.js").connection;

// get inquirer questions
const ask = require("./inquirer.js").ask;

// inclusive min <= random <= inclusive max
function getRandomIntInclusive(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tableColumns = [
    "column 0 doesn't exist in mysql",
    "item_id",
    "product_name",
    "department_name",
    "price",
    "stock_quantity"
];

const departmentNames = [
    "variables",
    "functions"
];

const productNames = [
    "boolean",
    "number",
    "string",
    "array",
    "object",
    "undefined",
    "callback",
    "closure",
    "promise",
    "recursion"
];

let inventory;

function resetInventory(counter = 0) {
    const query = db.query(
        "UPDATE products SET ? WHERE ?",
        [
            // SET first ?
            {
                price: getRandomIntInclusive(100, 999) / 100,
                stock_quantity: getRandomIntInclusive(10, 99)
            },
            // WHERE second ?
            {
                product_name: productNames[counter]
            }
        ],
        function (err, queryResponse) {
            if (err) throw err;
            //log(`${queryResponse.affectedRows} item updated\n`);
            //log(queryResponse);
        }
    );
    // logs actual query syntax
    //log(query.sql);

    // to enforce syncronous queries
    // call next query at end of current query
    if (counter < productNames.length - 1) {
        counter++;
        resetInventory(counter);
    } else {
        getInventory(ask(inventory));
    }
    // don't db.end() until all db.query() completed
}

function getInventory(callback) {
    const query = db.query(
        "SELECT item_id, product_name, price, department_name FROM products",
        function (err, queryResponse) {
            if (err) throw err;
            //log(`getInventory queryResponse:\n${JSON.stringify(queryResponse)}`);
            inventory = queryResponse;
            inventory.forEach(function (element) {
                log(`ID ${element.item_id} ${element.product_name} ${element.department_name} for: $${element.price}`)
            });
        }
    );
    // logs actual query syntax
    //log(`getInventory sql:\n${query.sql}`);

    // to enforce syncronous queries
    // call next query at end of current query

    // don't db.end() until all db.query() completed
}

module.exports.tableColumns = tableColumns;
module.exports.departmentNames = departmentNames;
module.exports.productNames = productNames;
module.exports.resetInventory = resetInventory;
module.exports.getInventory = getInventory;
module.exports.inventory = inventory;