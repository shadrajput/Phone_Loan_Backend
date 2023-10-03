'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "bill_number" on table "purchase"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-10-03T18:17:54.042Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "purchase",
        "bill_number",
        {
            "type": Sequelize.STRING,
            "field": "bill_number",
            "allowNull": true
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
