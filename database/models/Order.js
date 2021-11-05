//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deliverAdress: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {})

    return Order
}