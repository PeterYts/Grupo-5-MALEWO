module.exports = (sequelize, dataTypes) =>{
    const User = sequelize.define('Users', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
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
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
             
    });
    return User
}