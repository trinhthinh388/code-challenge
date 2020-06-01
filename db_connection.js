const Sequelize = require('sequelize');
const UserModel = require('./model/user');
const UserPersModel = require('./model/user-pers');
const sequelize = new Sequelize("codechallenge", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});


const User = UserModel(sequelize, Sequelize);
const UserPers = UserPersModel(sequelize, Sequelize);

module.exports = {
    User, UserPers
}