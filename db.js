const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'todos',
    'root',
    'root', {
    dialect: 'mysql',
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
);

const ConnectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Succfully Connect To Database");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sequelize, ConnectToDb }

