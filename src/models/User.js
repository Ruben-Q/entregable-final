const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require("bcrypt")

const User = sequelize.define('user', {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
/*
    role: {
        type: DataTypes.ENUM({
            values: ['user', "admin"], //Solo funciona con "user, admin" / El producto podra ser editado solo si el usuario tiene "seteado: admi en el Where" / Tambien se puede gace un "miderword"
        })
    }
*/
});
User.beforeCreate( async(user)=>{
    const {password} = user
    const hash = await bcrypt.hash(password,10)
    user.password = hash
} )
module.exports = User;