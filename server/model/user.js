'use strict'
const sequelize = require('./connect')
const Sequelize = require('sequelize')
const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    pwd: Sequelize.STRING,
    email: Sequelize.STRING,
    status: Sequelize.INTEGER,
    reg_time: Sequelize.DATE,
    token: Sequelize.STRING
}, {
    timestamps: false,
})

exports = module.exports = {
    User,

    checkUser: function(user) {

        return User.findOne({
            where: {
                name: user.name,
                pwd: user.pwd
            }
        })
    },
    setToken: function(name, token) {
        return User.update({
            token: token
        }, {
            where: {
                name: name
            }
        })
    },
    add(u) {
        return User.create(u)
    },
    allUser(query) {
        let page = query.page || 1
        delete query.page
        return User.findAll({
            attributes: ['id', 'name', 'email', 'reg_time', 'status'],
            where: query,
            offset: (page - 1) * 10,
            limit: page * 10,
        })
    },
    update(condition, data) {
        return User.update(
            data, {
                where: condition
            }

        )
    },
    count(query) {
        return User.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'num']
            ],
            where: query
        })
    }
}
