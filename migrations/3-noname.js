'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "admin_id" from table "admin"
 * removeColumn "phone_id" from table "purchase"
 * addColumn "admin_id" to table "receipt"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2023-07-05T19:11:18.777Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["admin", "admin_id"]
    },
    {
        fn: "removeColumn",
        params: ["purchase", "phone_id"]
    },
    {
        fn: "addColumn",
        params: [
            "receipt",
            "admin_id",
            {
                "type": Sequelize.INTEGER,
                "field": "admin_id",
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
