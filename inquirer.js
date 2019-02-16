"use strict";
// toggle debug mode from config.js
const log = require("./config.js").log;

// global npm install directory
const npmGlobalInstallDir = require("./config.js").npmGlobalInstallDir;

const tableColumns = require("./query.js").tableColumns;
const departmentNames = require("./query.js").departmentNames;
const productNames = require("./query.js").productNames;

// require inquirer to get user input
const inquirer = require(`${npmGlobalInstallDir}inquirer`);

// prompt user
function ask(funcAfterAnswered) {
    inquirer
        .prompt([ // array of question objects
            { // list of products
                name: "whatProduct",
                type: "list",
                message: "What product would you like to buy?",
                choices: productNames
            },
            { // how many
                name: "howMany",
                type: "prompt",
                message: "How many would you like to purchase?",
                validate: function(answer){
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
            },
            { // confirm how many
                name: "confirmHowMany",
                type: "confirm",
                message: "Are you sure?",
                default: true
            }
        ]).then(function (answers) {
            // if confirm, display inquirerResponse
            if (answers.confirm) {
                console.log(`You've ordered ${answers.howMany} of the item ${answers.whatProduct}`);
            } else {
                console.log(`\nNo worries. Think about it and come back. Thank you.\n`);
            }
            funcAfterAnswered(answers);
        });
}

module.exports.ask = ask;