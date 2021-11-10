//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: '0c0d6b0b4983ed5e9a759b99d96256a2.png'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, {});

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        })

        Product.belongsToMany(models.Order, {
            as: 'orders',
            through: 'OrderProduct',
            foreignKey: 'orderId',
            otherKey: 'productId',
            timestamps: false
        })
    }

    return Product;
}