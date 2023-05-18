const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Role;