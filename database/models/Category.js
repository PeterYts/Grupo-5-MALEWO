

module.exports = (sequelize,dataTypes)=>{
    const Category = sequelize.define('Categories', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        description: {
            allowNull: false,
            type: dataTypes.TEXT
        }
    });
    return Category
}