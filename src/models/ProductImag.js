const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImag = sequelize.define('modelName', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
});

module.exports = ProductImag;