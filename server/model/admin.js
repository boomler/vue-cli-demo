'use strict'
const sequelize = require('./connect')
const Sequelize = require('sequelize')
const Admin = sequelize.define('admin', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    pwd: Sequelize.STRING,
}, {
    timestamps: false,
    tableName:'admin'
})

exports = module.exports = {

    checkadmin: function(admin) {

        return Admin.findOne({
            where: {
                name: admin.name,
                pwd: admin.pwd
            }
        })
    },
    update(condition, data) {
        return Admin.update(
            data, {
                where: condition
            }

        )
    }

}
