'use strict'
const sequelize = require('./connect')
const user = require('./user').User
const Sequelize = require('sequelize')

const Comments = sequelize.define('comment', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  father: Sequelize.INTEGER,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: user,
      key: 'id'
    }
  },
  articleId: {
    type: Sequelize.INTEGER,
    references: {
      model: user,
      key: 'id'
    }
  },
  content: Sequelize.TEXT,
  time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  type: { type: Sequelize.STRING, defaultValue: 1 },
  status: { type: Sequelize.STRING, defaultValue: 0 },
}, {
  timestamps: false,
  tableName: 'comment'
})
Comments.belongsTo(user)

exports = module.exports = {

  findAll(query, page) {
    return Comments.findAll({
      attributes: ['id', 'content', 'time', 'type', 'status'],
      where: query,
      offset: (page - 1) * 10,
      limit: page * 10,
      include: [
        { model: user },
      ]
    })
  },
  count(query) {
    return Comments.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'num']
      ],
      where: query
    })
  },
  update(query, update) {
    return Comments.update(
      update, {
        where: query
      }

    )
  },
  findOne: function(query) {
    console.log(query)
    return Comments.findOne({
      // attributes:['title','id','thumbnail','abstract','code','Category'],
      where: query,
      include: [
        { model: user },
      ]
    })
  }
}
