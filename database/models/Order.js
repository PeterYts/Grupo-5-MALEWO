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
        }
    }, {
        timestamps: false
    })

    Order.associate = (models) => {
        Order.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'userId'
        })
        Order.belongsToMany(models.Products, {
            through: "ProductsOrders",
        })
    }

    return Order
}