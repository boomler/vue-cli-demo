'use strict'
const sequelize = require('./connect')
const Sequelize = require('sequelize')
const File = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  origin_name:Sequelize.STRING,
  path:Sequelize.STRING,
  destination:Sequelize.STRING,
  size:Sequelize.STRING,
  encoding:Sequelize.STRING,
  mimetype:Sequelize.STRING,
  status:{type:Sequelize.STRING,defaultValue:1},
}, {
  timestamps: false,
  tableName:'file'
})

exports = module.exports = {
 newFile(file){
  let f = {
    name:file.filename||'',
    origin_name:file.originalname||'',
    mimetype:file.mimetype||'',
    path:file.path||'',
    destination:file.destination||'',
    size:file.size||'',
    encoding:file.encoding||''
  }
  return File.create(f)
 }
}
