"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// get mysql connection
const db = require("./mysql.js").connection;

// get inquirer questions
const whatProduct = require("./inquirer.js").whatProduct;

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

const getDepartmentNames = () => {
    return [
        "variables",
        "variables",
        "variables",
        "variables",
        "variables",
        "variables",
        "functions",
        "functions",
        "functions",
        "functions"
    ];
};

const getProductNames = () => {
    return [
        "boolean variables",
        "number variables",
        "string variables",
        "array variables",
        "object variables",
        "undefined variables",
        "callback functions",
        "closure functions",
        "promise functions",
        "recursion functions"
    ];
};

//let inventory;

function resetInventory(counter = 0) {
    //const query = 
    db.query(
        "UPDATE products SET ? WHERE ?",
        [
            // SET first ?
            {
                price: getRandomIntInclusive(100, 999) / 100,
                stock_quantity: getRandomIntInclusive(10, 99)
            },
            // WHERE second ?
            {
                product_name: getProductNames()[counter]
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
    if (counter < getProductNames.length - 1) {
        counter++;
        resetInventory(counter);
    } else {
        getInventory();
    }
    // don't db.end() until all db.query() completed
}

function getInventory() {
    //const query = 
    db.query(
        "SELECT * FROM products",
        function (err, queryResponse) {
            if (err) throw err;
            //log(`getInventory queryResponse:\n${JSON.stringify(queryResponse)}`);
            queryResponse.forEach(function (element) {
                log(`ID(${element.item_id}) ${element.product_name} ${element.department_name} --- $${element.price} --- (ONLY ${element.stock_quantity} LEFT)`)
            });
            whatProduct(JSON.parse(JSON.stringify(queryResponse)));
        }
    );
    // logs actual query syntax
    //log(`getInventory sql:\n${query.sql}`);

    // to enforce syncronous queries
    // call next query at end of current query

    // don't db.end() until all db.query() completed
}

function adjustStockQuantity(newStockQuantity, productName) {
    //const query = 

    log(`ADJUST ${productName} TO: ${newStockQuantity}`)
    db.query(
        "UPDATE products SET ? WHERE ?",
        [
            // SET first ?
            {
                stock_quantity: newStockQuantity
            },
            // WHERE second ?
            {
                product_name: productName
            }
        ],
        function (err, queryResponse) {
            if (err) throw err;
            log(`${queryResponse.affectedRows} item updated\n`);
            //log(queryResponse);
        }
    );
    // logs actual query syntax
    //log(`getInventory sql:\n${query.sql}`);
    getInventory();
    // to enforce syncronous queries
    // call next query at end of current query
    
    // don't db.end() until all db.query() completed
}



module.exports.tableColumns = tableColumns;
module.exports.departmentNames = getDepartmentNames;
module.exports.getProductNames = getProductNames;
module.exports.resetInventory = resetInventory;
module.exports.getInventory = getInventory;
module.exports.adjustStockQuantity = adjustStockQuantity;
// module.exports.inventory = inventory;