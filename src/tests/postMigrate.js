const sequelize = require('../utils/connection');
require('../models')

const postMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('Base de datos activa✅');
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

postMigrate()