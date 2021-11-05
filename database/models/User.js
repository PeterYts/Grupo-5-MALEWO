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
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: dataTypes.DATE,
            defaultValue: null
        }
             
    });
    return User
}