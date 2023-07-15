'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "company", deps: []
 * createTable "document", deps: []
 * createTable "installment", deps: []
 * createTable "user", deps: []
 * createTable "admin", deps: [user]
 * createTable "customer", deps: [document, user]
 * createTable "phone", deps: [company]
 * createTable "specification", deps: [phone]
 * createTable "purchase", deps: [customer, specification, installment]
 * createTable "emi", deps: [purchase]
 * createTable "receipt", deps: [emi, admin]
 * createTable "transaction", deps: [receipt]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-07-12T10:16:20.637Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "company",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "company_name": {
                    "type": Sequelize.STRING,
                    "field": "company_name",
                    "validate": {
                        "notEmpty": true,
                        "isAlpha": {
                            "args": true,
                            "msg": "Please enter only letters"
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
            "installment",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "month": {
                    "type": Sequelize.INTEGER,
                    "field": "month",
                    "allowNull": false
                },
                "charges": {
                    "type": Sequelize.INTEGER,
                    "field": "charges",
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
                            "msg": "Please enter atleast 3 characters"
                        }
                    },
                    "allowNull": false
                },
                "is_admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_admin",
                    "allowNull": false,
                    "default": false
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
                "photo": {
                    "type": Sequelize.STRING,
                    "field": "photo",
                    "defaultValue": "default",
                    "allowNull": false
                },
                "full_name": {
                    "type": Sequelize.STRING,
                    "field": "full_name",
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
                    "allowNull": true
                },
                "reference_mobile": {
                    "type": Sequelize.STRING,
                    "field": "reference_mobile",
                    "allowNull": true
                },
                "document_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "document_id",
                    "references": {
                        "model": "document",
                        "key": "id"
                    }
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "phone",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "model_name": {
                    "type": Sequelize.STRING,
                    "field": "model_name",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "company_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "company_id",
                    "references": {
                        "model": "company",
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
    },
    {
        fn: "createTable",
        params: [
            "specification",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "ram": {
                    "type": Sequelize.INTEGER,
                    "field": "ram",
                    "allowNull": true
                },
                "storage": {
                    "type": Sequelize.INTEGER,
                    "field": "storage",
                    "allowNull": true
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "allowNull": true
                },
                "phone_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "phone_id",
                    "references": {
                        "model": "phone",
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
    },
    {
        fn: "createTable",
        params: [
            "purchase",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "customer_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "customer_id",
                    "references": {
                        "model": "customer",
                        "key": "id"
                    }
                },
                "specification_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "specification_id",
                    "references": {
                        "model": "specification",
                        "key": "id"
                    }
                },
                "installment_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "installment_id",
                    "references": {
                        "model": "installment",
                        "key": "id"
                    }
                },
                "pending_amount": {
                    "type": Sequelize.INTEGER,
                    "field": "pending_amount",
                    "allowNull": false
                },
                "iemi": {
                    "type": Sequelize.STRING,
                    "field": "iemi",
                    "allowNull": false
                },
                "net_amount": {
                    "type": Sequelize.INTEGER,
                    "field": "net_amount",
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
            "emi",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount",
                    "allowNull": false
                },
                "due_date": {
                    "type": Sequelize.DATE,
                    "field": "due_date",
                    "allowNull": false
                },
                "paid_date": {
                    "type": Sequelize.DATE,
                    "field": "paid_date",
                    "allowNull": true
                },
                "status": {
                    "type": Sequelize.STRING,
                    "field": "status",
                    "allowNull": false
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type",
                    "allowNull": false
                },
                "purchase_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "purchase_id",
                    "references": {
                        "model": "purchase",
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
    },
    {
        fn: "createTable",
        params: [
            "receipt",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "receipt_id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "receipt_id",
                    "unique": true,
                    "allowNull": false
                },
                "emi_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "emi_id",
                    "references": {
                        "model": "emi",
                        "key": "id"
                    }
                },
                "extra_charge": {
                    "type": Sequelize.INTEGER,
                    "field": "extra_charge",
                    "allowNull": false,
                    "defaultValue": 0
                },
                "admin_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "admin",
                        "key": "id"
                    },
                    "field": "admin_id",
                    "allowNull": false
                },
                "is_deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_deleted",
                    "allowNull": false,
                    "defaultValue": false
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
            "transaction",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "receipt_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "allowNull": true,
                    "field": "receipt_id",
                    "references": {
                        "model": "receipt",
                        "key": "id"
                    }
                },
                "is_by_cheque": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_by_cheque"
                },
                "is_by_cash": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_by_cash"
                },
                "is_by_upi": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_by_upi"
                },
                "cheque_no": {
                    "type": Sequelize.INTEGER,
                    "field": "cheque_no"
                },
                "cheque_date": {
                    "type": Sequelize.DATE,
                    "field": "cheque_date"
                },
                "upi_no": {
                    "type": Sequelize.INTEGER,
                    "field": "upi_no"
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount"
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
