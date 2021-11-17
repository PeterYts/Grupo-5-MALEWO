module.exports = (sequelize, dataTypes) =>{
    const User = sequelize.define('Users', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING,
            unique: true
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: dataTypes.INTEGER       
        },
        img: {
            allowNull: false,
            type: dataTypes.STRING
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: dataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        updatedAt: {
            type: dataTypes.DATE,
            defaultValue: null
        }
             
    });

    User.associate = (models) => {
        User.hasMany(models.BuyerData, {
            as: 'buyerData',
            foreignKey: 'userId'
        })

        User.hasMany(models.Orders, {
            as: 'order',
            foreignKey: 'userId'
        })
    }

    return User
}