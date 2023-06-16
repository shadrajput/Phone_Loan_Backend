'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "reference_name" on table "customer"
 * changeColumn "ram" on table "specification"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-06-09T10:27:51.676Z",
    "comment": ""
};

var migrationCommands = [{
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
            "ram",
            {
                "type": Sequelize.INTEGER,
                "field": "ram",
                "allowNull": true,
                "unique": false
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
