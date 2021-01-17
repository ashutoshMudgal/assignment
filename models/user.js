'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        mobile: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        password_salt: DataTypes.STRING,
    }, {
        tableName: 'users',
        freezeTableName: true
    });
    return users;
};