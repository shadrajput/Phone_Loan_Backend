'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "photo" to table "customer"
 * changeColumn "reference_name" on table "customer"
 * changeColumn "price" on table "specification"
 * changeColumn "ram" on table "specification"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2023-06-11T07:30:11.516Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "customer",
            "photo",
            {
                "type": Sequelize.STRING,
                "field": "photo",
                "defaultValue": "default",
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
                "validate": {
                    "is": {}
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "specification",
            "price",
            {
                "type": Sequelize.INTEGER,
                "field": "price",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "specification",
            "ram",
            {
                "type": Sequelize.INTEGER,
                "field": "ram",
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
