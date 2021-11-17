const { sequelize } = require(".");

module.exports = (sequelize, dataTypes)=>{
    const OrderProduct = sequelize.define('OrderProducts', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        orderId: {
            type: dataTypes.INTEGER,
            allowNull:false
        }
    })

    return OrderProduct
}