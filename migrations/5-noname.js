'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "phone_id" from table "phone"
 * changeColumn "company_id" on table "phone"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2023-07-06T11:50:33.391Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["phone", "phone_id"]
    },
    {
        fn: "changeColumn",
        params: [
            "phone",
            "company_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "allowNull": true,
                "field": "company_id",
                "references": {
                    "model": "company",
                    "key": "id"
                }
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
