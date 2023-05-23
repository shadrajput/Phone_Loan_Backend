const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: {
                    args: true,
                    msg: 'Please enter only letters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        pin: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            // validate: {
            //     min: {
            //         args: 4,
            //         msg: "Please enter valid pin"
            //     },
            //     max: {
            //         args: 4,
            //         msg: "Please enter valid pin"
            //     },
            // }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: {
                    args: true,
                    msg: 'Please enter only letters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // validate: {
            //     min: {
            //         args: 10,
            //         msg: "Please enter valid mobile number"
            //     },
            //     max: {
            //         args: 10,
            //         msg: "Please enter valid mobile number"
            //     },
            // }
        },
        alternate_no: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     min: {
            //         args: 10,
            //         msg: "Please enter valid mobile number"
            //     },
            //     max: {
            //         args: 10,
            //         msg: "Please enter valid mobile number"
            //     },
            // }
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: {
                    args: true,
                    msg: 'Please enter only letters'
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: {
                    args: true,
                    msg: 'Please enter only letters'
                }
            }
        },
        date_of_joining: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    })

    return Admin
}