const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // El valor null por default es true.
    // El valor cuando no lo comparto es nulo.
    //    stock: {
    //    type: DataTypes.INTEGER,
    //    allowNull: true:
    //    defaultValue:
    //}
});

module.exports = Product;