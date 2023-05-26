'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "user_id" to table "customer"
 * changeColumn "reference_name" on table "customer"
 *
 **/

var info = {
    "revision": 2,
    "name": "user_id_added_in_customer",
    "created": "2023-05-24T13:49:03.975Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "customer",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "field": "user_id",
                "references": {
                    "model": "user",
                    "key": "id"
                }
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
