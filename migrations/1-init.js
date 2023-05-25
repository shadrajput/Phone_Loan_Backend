'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "document", deps: []
 * createTable "user", deps: []
 * createTable "customer", deps: [document]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2023-05-24T13:48:34.074Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "document",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "adhar_front": {
                    "type": Sequelize.STRING,
                    "field": "adhar_front",
                    "defaultValue": "default",
                    "allowNull": false
                },
                "adhar_back": {
                    "type": Sequelize.STRING,
                    "field": "adhar_back",
                    "defaultValue": "default",
                    "allowNull": false
                },
                "pancard": {
                    "type": Sequelize.STRING,
                    "field": "pancard",
                    "defaultValue": "default",
                    "allowNull": false
                },
                "light_bill": {
                    "type": Sequelize.STRING,
                    "field": "light_bill",
                    "allowNull": true
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "validate": {
                        "min": {
                            "args": 3,
                            "msg": "Please enter alleast 3 characters"
                        }
                    },
                    "allowNull": false
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "customer",
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
                "mobile": {
                    "type": Sequelize.STRING,
                    "field": "mobile",
                    "allowNull": false
                },
                "alternate_no": {
                    "type": Sequelize.STRING,
                    "field": "alternate_no",
                    "allowNull": true
                },
                "reference_name": {
                    "type": Sequelize.STRING,
                    "field": "reference_name",
                    "validate": {
                        "is": {}
                    },
                    "allowNull": true
                },
                "reference_mobile": {
                    "type": Sequelize.INTEGER,
                    "field": "reference_mobile",
                    "validate": {
                        "min": {
                            "args": 10,
                            "msg": "Please enter valid mobile number"
                        },
                        "max": {
                            "args": 10,
                            "msg": "Please enter valid mobile number"
                        }
                    },
                    "allowNull": true
                },
                "document_id": {
                    "type": Sequelize.INTEGER,
                    "field": "document_id",
                    "references": {
                        "model": "document",
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
                }
            },
            {}
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
