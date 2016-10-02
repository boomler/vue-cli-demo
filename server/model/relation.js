'use strict'
const sequelize = require('./connect')
const Sequelize = require('sequelize')
const relation = sequelize.define('admin', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.INTEGER,
    from: Sequelize.INTEGER,
    to: Sequelize.INTEGER,
}, {
    timestamps: false,
    tableName: 'relation'
})

exports = module.exports = {

    all: function(type, id) {

        return relation.findAll({
            attributes: ['from', 'to'],
            where: {
                $or: [{ from: id }, { to: id }],
                type: type
            }
        })
    },
    add: function(data) {
        return relation.create(data)
    },
    delete: function(query) {
        return relation.destroy({
            where:  query
        })

    }

}
