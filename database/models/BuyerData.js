//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const buyerData = sequelize.define('BuyerData')

    return buyerData
}