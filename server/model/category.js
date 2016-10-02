'use strict'
const sequelize = require('./connect')
const Sequelize = require('sequelize')
const Category = sequelize.define('category', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  father: { type: Sequelize.TEXT, defaultValue: 0 },
  type: { type: Sequelize.STRING, defaultValue: 1 },
  status: { type: Sequelize.STRING, defaultValue: 1 },
}, {
  timestamps: false,
  tableName: 'category'
})

exports = module.exports = {
  Category,
  findAll(query) {
    return Category.findAll({
      attributes: ['id', 'name', 'description', 'father'],
      where: query,
    })
  },
  add(data) {
    return Category.create(data)
  },
  update(condition,data) {
    return Category.update(
       data,
      {
        where: condition
      }

    )
  }
  // ,
  // getId(condition){
  //   return category.findOne({
  //     attributes:[cid],
  //     where:condition
  //   }).id
  // }
}
