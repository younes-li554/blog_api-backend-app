const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define("Note", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {timestamps: true})

const User = require("./user");

User.hasMany(Note, {foreignKey: "userId"});
Note.belongsTo(User, {foreignKey: "userId"})

module.exports = Note;

