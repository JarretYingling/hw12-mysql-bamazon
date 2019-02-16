"use strict";

// toggle debug mode
const DEBUG_MODE = true;
//const DEBUG_MODE = false;

// declare variables for debug mode
let log
let npmGlobalInstallDir

if (DEBUG_MODE) {
    // reassign console.log
    log = console.log;
    // use global npm install directory
    npmGlobalInstallDir = "/usr/local/lib/node_modules/";
} else if (!DEBUG_MODE) {
    // log = do nothing
    log = function () {
        //do nothing
    }
    // default to local node_modules
    npmGlobalInstallDir = "";
}

module.exports.log = log;
module.exports.npmGlobalInstallDir = npmGlobalInstallDir;