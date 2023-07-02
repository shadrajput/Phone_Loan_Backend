'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "is_deleted" to table "receipt"
 * changeColumn "reference_name" on table "customer"
 *
 **/

var info = {
    "revision": 7,
    "name": "noname",
    "created": "2023-06-30T05:47:02.335Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "receipt",
            "is_deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "is_deleted",
                "allowNull": false,
                "defaultValue": false
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
                "validate": {
                    "is": {}
                },
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
