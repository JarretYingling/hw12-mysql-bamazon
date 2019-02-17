"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// global npm install directory
const npmGlobalInstallDir = require("./config.js").npmGlobalInstallDir;

// get mysql connection
const query = require("./query.js");

// get inventory
// const inventory = require("./query.js").inventory;
const tableColumns = require("./query.js").tableColumns;
const getDepartmentNames = require("./query.js").getDepartmentNames;
const getProductNames = () => require("./query.js").getProductNames;

// require inquirer to get user input
const inquirer = require(`${npmGlobalInstallDir}inquirer`);

let productName = "";
let stockQuantity = 0;
let orderedQuantity = 0;
let price = 0.00;
let productNameDept = "";
let newStockQuantity = 0;

// prompt user for product
function whatProduct(inventory) {
    inquirer
        .prompt([ // array of question objects
            { // list of products
                name: "whatProduct",
                type: "rawlist",
                message: "\nFrom the inventory above, what product would you like to order?\n\nYou selected: ",
                choices: getProductNames()
            }
        ]).then(function (answers) {
            /*
            log("answers:");
            log(answers);
            log(typeof inventory);
            log("inventory:");
            log(inventory);
            */
            let choice = answers.whatProduct.split(" ")[0];
            //log(choice);
            inventory.forEach(function (value, index) {
                //log(value.product_name);
                if (value.product_name === choice) {
                    //log(index);
                    //arrIndex = index;
                    productName = inventory[index].product_name;
                    stockQuantity = inventory[index].stock_quantity;
                    price = inventory[index].price;
                    //log(arrIndex);
                }
            });
            //log(`index: ${arrIndex}`);
            productNameDept = answers.whatProduct
            log(`We have ${stockQuantity} "${productNameDept}" in stock.\n`);
            howMany(inventory);
        }).catch(function (err) {
            if (err) throw err;
            log("ask() error");
        });
}

// prompt user for quantity
function howMany(inventory) {
    inquirer
        .prompt([ // array of question objects
            { // how many
                name: "howMany",
                type: "prompt",
                message: "How many would you like to purchase?",
                validate: function (answer) {
                    let message = `${answer} is not a positive whole number < ${stockQuantity}`;
                    if (isNaN(answer)) {
                        return message;
                    } else if (!Number.isInteger(parseFloat(answer))) {
                        return message;
                    } else if (parseInt(answer) < 1) {
                        return message;
                    } else if (parseInt(answer) > stockQuantity) {
                        return `Unfortunately we only have ${stockQuantity} in stock.`;
                    } else {
                        return true;
                    }
                }
            }, { // confirm how many
                name: "confirmHowMany",
                type: "confirm",
                message: `They are $${price} each.\n\nAre you sure?\n`,
                default: true
            }
        ]).then(function (answers) {
            // if confirm, display inquirerResponse
            //log(answers);
            if (answers.confirmHowMany) {
                orderedQuantity = answers.howMany;
                newStockQuantity = stockQuantity - orderedQuantity;
                //log(`${stockQuantity} x $${price} = $${stockQuantity * price}`);
                log(`\nYou've ordered ${orderedQuantity} ${productNameDept}\nat $${price} each for a total of $${orderedQuantity * price}`);
                confirmPurchase();
            } else {
                log(`\nNo worries. Think about it and come back. Thank you.\n`);
            }
        }).catch(function (err) {
            if (err) throw err;
            log("ask() error");
        });
}

// prompt user for product
function confirmPurchase() {
    inquirer
        .prompt([ // array of question objects
            { // confirm purchase
                name: "confirmPurchase",
                type: "prompt",
                message: `\nThank you for your purchase of ${orderedQuantity} ${productNameDept}.\nPress any key to view adjusted inventory and make another purchase.`,
                default: true
            }
        ]).then(function (answers) {
            //log(`\nYou've ordered ${orderedQuantity} ${productNameDept}\nat $${price} each for a total of $${orderedQuantity * price}`);
            query.adjustStockQuantity(newStockQuantity, productName);
            //log(`\nNo worries. Think about it and come back. Thank you.\n`);
        }).catch(function (err) {
            if (err) throw err;
            log("ask() error");
        });
}

module.exports.whatProduct = whatProduct;

/*

*/