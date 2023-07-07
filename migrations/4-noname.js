'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "admin_id" on table "receipt"
 * changeColumn "admin_id" on table "receipt"
 * changeColumn "admin_id" on table "receipt"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2023-07-05T19:13:19.625Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "receipt",
            "admin_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "admin",
                    "key": "id"
                },
                "field": "admin_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "receipt",
            "admin_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "admin",
                    "key": "id"
                },
                "field": "admin_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "receipt",
            "admin_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "admin",
                    "key": "id"
                },
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
