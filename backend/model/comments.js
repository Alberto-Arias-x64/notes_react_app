const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const User = require('./users')

const Comment = sequelize.define('Comments',{
    id_comment : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique : true,
        primaryKey: true,
        allowNull: false,
    },
    title : {
        type: Sequelize.STRING,
        allowNull : false
    },
    note : {
        type : Sequelize.TEXT,
        allowNull : false
    }
})

User.hasOne(Comment,{
    onDelete: "cascade",
    foreignKey: {
        allowNull: false
    }
})

module.exports = Comment