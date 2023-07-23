'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "colour" to table "specification"
 * changeColumn "first_name" on table "admin"
 * changeColumn "last_name" on table "admin"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-07-22T13:38:11.788Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "specification",
            "colour",
            {
                "type": Sequelize.STRING,
                "field": "colour",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "admin",
            "first_name",
            {
                "type": Sequelize.STRING,
                "field": "first_name",
                "validate": {
                    "notEmpty": true
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "admin",
            "last_name",
            {
                "type": Sequelize.STRING,
                "field": "last_name",
                "validate": {
                    "notEmpty": true
                },
                "allowNull": false
            }
        ]
    }
];

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
