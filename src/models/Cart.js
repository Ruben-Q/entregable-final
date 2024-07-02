const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('Cart', {

    quantity: {
        type: DataTypes. INTEGER,
        allowNull: false
    },
    //UserId
    //productId
});


module.exports = Cart;