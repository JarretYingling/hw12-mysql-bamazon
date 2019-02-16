"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// global npm install directory
const npmGlobalInstallDir = require("./config.js").npmGlobalInstallDir;

// get inventory
// const inventory = require("./query.js").inventory;
const tableColumns = require("./query.js").tableColumns;
const getDepartmentNames = require("./query.js").getDepartmentNames;
const getProductNames = () => require("./query.js").getProductNames;

// require inquirer to get user input
const inquirer = require(`${npmGlobalInstallDir}inquirer`);

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
            let arrIndex = 0;
            inventory.forEach(function(value, index){
                //log(value.product_name);
                if (value.product_name === choice) {
                    //log(index);
                    arrIndex = index;
                    //log(arrIndex);
                }
            });
            //log(`index: ${arrIndex}`);
            log(`We only have ${inventory[arrIndex].stock_quantity} "${answers.whatProduct}" in stock.\n`);
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
                    let message = `${answer} is not a positive whole number`;
                    if (typeof answer !== 'number') {
                        return message;
                    } else if (Number.isInteger(answer)) {
                        return message;
                    } else if (answer < 1) {
                        return message;
                    } else {
                        return true;
                    }
                }
            }, { // confirm how many
                name: "confirmHowMany",
                type: "confirm",
                message: "Are you sure?",
                default: true
            }
        ]).then(function (answers) {
            // if confirm, display inquirerResponse
            if (answers.confirm) {
                log(`You've ordered ${answers.howMany} of the item ${answers.whatProduct}`);
            } else {
                log(`\nNo worries. Think about it and come back. Thank you.\n`);
            }
        }).catch(function (err) {
            if (err) throw err;
            log("ask() error");
        });
}

module.exports.whatProduct = whatProduct;

/*

*/