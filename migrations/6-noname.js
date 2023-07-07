'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "net_amount" on table "purchase"
 * changeColumn "pending_amount" on table "purchase"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2023-07-06T14:06:10.499Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "purchase",
            "net_amount",
            {
                "type": Sequelize.INTEGER,
                "field": "net_amount",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "purchase",
            "pending_amount",
            {
                "type": Sequelize.INTEGER,
                "field": "pending_amount",
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
