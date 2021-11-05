//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const BuyerData = sequelize.define('BuyerData', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nameSurname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        expirationMonth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        securityCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DNI: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return BuyerData
}