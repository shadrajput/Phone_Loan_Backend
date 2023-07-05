'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "specification_id" to table "purchase"
 * changeColumn "phone_id" on table "purchase"
 * changeColumn "phone_id" on table "purchase"
 * changeColumn "password" on table "user"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-07-05T10:53:22.989Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "purchase",
            "specification_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "allowNull": true,
                "field": "specification_id",
                "references": {
                    "model": "specification",
                    "key": "id"
                }
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "purchase",
            "phone_id",
            {
                "type": Sequelize.INTEGER(11),
                "field": "phone_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "phone",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "purchase",
            "phone_id",
            {
                "type": Sequelize.INTEGER(11),
                "field": "phone_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "phone",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "user",
            "password",
            {
                "type": Sequelize.STRING,
                "field": "password",
                "validate": {
                    "min": {
                        "args": 3,
                        "msg": "Please enter atleast 3 characters"
                    }
                },
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
