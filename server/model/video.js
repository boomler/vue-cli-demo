'use strict'
const sequelize = require('./connect')
const Category = require('./category').Category
const Sequelize = require('sequelize')

const Video = sequelize.define('video', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  code: Sequelize.STRING,
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  },
  thumbnail: Sequelize.STRING,
  description: Sequelize.TEXT,
  content: Sequelize.TEXT,
  time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  priority: { type: Sequelize.STRING, defaultValue: 1 },
  position: { type: Sequelize.STRING, defaultValue: 1 },
  liked: { type: Sequelize.STRING, defaultValue: 1 },
  status: { type: Sequelize.STRING, defaultValue: 0 },
}, {
  timestamps: false,
  tableName: 'video'
})
Video.belongsTo(Category)

exports = module.exports = {

  create(data) {
    return Video.create(data)
  },
  findAll(query, page) {
    return Video.findAll({
      attributes: ['id', 'thumbnail', 'description', 'title', 'time', 'position', 'priority', 'status'],
      where: query,
      offset: (page - 1) * 10,
      limit: page * 10,
      order: [
        ['position', 'DESC'],
        ['priority', 'DESC']
      ],
      include: [
        { model: Category },
      ]
    })
  },
  count(query) {
    return Video.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'num']
      ],
      where: query
    })
  },
  update(query, update) {
    return Video.update(
      update, {
        where: query
      }

    )
  },
  findOne: function(query) {
    console.log(query)
    return Video.findOne({
      // attributes:['title','id','thumbnail','abstract','code','Category'],
      where: query,
      include: [
        { model: Category },
      ]
    })
  }
}
