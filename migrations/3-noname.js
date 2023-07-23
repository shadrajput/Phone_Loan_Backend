'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "colour" from table "specification"
 * addColumn "colour" to table "purchase"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2023-07-23T06:18:59.617Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["specification", "colour"]
    },
    {
        fn: "addColumn",
        params: [
            "purchase",
            "colour",
            {
                "type": Sequelize.STRING,
                "field": "colour",
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
