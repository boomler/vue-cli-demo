'use strict'
const sequelize = require('./connect')
const Category = require('./category').Category
const Sequelize = require('sequelize')
const Image = sequelize.define('image', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  img: Sequelize.STRING,
  thumbnail: Sequelize.STRING,
  description: Sequelize.TEXT,
  content: Sequelize.TEXT,
  time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  priority: { type: Sequelize.STRING, defaultValue: 1 },
  position: { type: Sequelize.STRING, defaultValue: 1 },
  status: { type: Sequelize.STRING, defaultValue: 0 },
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'images'
})
Image.belongsTo(Category)
exports = module.exports = {
  create(data) {
    let img = {
      title: data.title || '',
      img: data.img || '',
      thumbnail: data.thumbnail || '',
      description: data.description || '',
      categoryId:data.categoryId
    }
    return Image.create(img)
  },
  findAll(query, page) {
    return Image.findAll({
      attributes: ['id', 'thumbnail','categoryId', 'description', 'title', 'time', 'position', 'priority', 'status'],
      where: query,
      offset: (page - 1) * 10,
      limit: page * 10,
      order:[
        ['position','DESC'],
        ['priority','DESC']
      ],
      include: [
        { model: Category }
      ]
    })
  },
  count(query) {
    return Image.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'num']
      ],
      where: query
    })
  },
  update(query, update) {
    return Image.update(
      update, {
        where: query
      } 
    )
  },
  findOne: function(query) {
    console.log(query)
    return Image.findOne({
      where: query,
      include: [
        { model: Category }
      ]
    })
  }
}
