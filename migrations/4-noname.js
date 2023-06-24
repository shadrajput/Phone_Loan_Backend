'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "admin", deps: [user, user]
 * changeColumn "reference_name" on table "customer"
 * changeColumn "paid_date" on table "emi"
 * changeColumn "extra_charge" on table "receipt"
 * changeColumn "extra_charge" on table "receipt"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2023-06-24T15:29:48.382Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "admin",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "validate": {
                        "notEmpty": true,
                        "isAlpha": {
                            "args": true,
                            "msg": "Please enter only letters"
                        }
                    },
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "validate": {
                        "notEmpty": true,
                        "isAlpha": {
                            "args": true,
                            "msg": "Please enter only letters"
                        }
                    },
                    "allowNull": false
                },
                "pin": {
                    "type": Sequelize.STRING,
                    "field": "pin",
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "user_id",
                    "references": {
                        "model": "user",
                        "key": "id"
                    }
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "admin_id": {
                    "type": Sequelize.INTEGER,
                    "field": "admin_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
            "emi",
            "paid_date",
            {
                "type": Sequelize.DATE,
                "field": "paid_date",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "receipt",
            "extra_charge",
            {
                "type": Sequelize.INTEGER,
                "field": "extra_charge",
                "allowNull": false,
                "defaultValue": 0
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "receipt",
            "extra_charge",
            {
                "type": Sequelize.INTEGER,
                "field": "extra_charge",
                "allowNull": false,
                "defaultValue": 0
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
