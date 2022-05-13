const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define('Users',{
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique : true,
        primaryKey: true,
        allowNull: false,
    },
    name : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    mail : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true
    },
    is_admin : {
        type : Sequelize.BOOLEAN,
        defaultValue : false,
        allowNull : false
    },
    password_hash : {
        type : Sequelize.STRING,
        allowNull : false 
    },
    imagen:{
        type : Sequelize.CHAR,
        allowNull: true,
        defaultValue: 'default.jpg'
    }
},{
    timestamps : false
})

module.exports = User