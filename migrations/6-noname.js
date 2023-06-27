'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "admin_id" to table "receipt"
 * changeColumn "full_name" on table "customer"
 * changeColumn "reference_name" on table "customer"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2023-06-27T07:37:24.627Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "receipt",
            "admin_id",
            {
                "type": Sequelize.INTEGER,
                "field": "admin_id",
                "references": {
                    "model": "admin",
                    "key": "id"
                }
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "customer",
            "full_name",
            {
                "type": Sequelize.STRING,
                "field": "full_name",
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
            "customer",
            "reference_name",
            {
                "type": Sequelize.STRING,
                "field": "reference_name",
                "allowNull": true
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
