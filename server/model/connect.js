const config = require('../config')
const Sequelize = require('sequelize')

var sequelize = new Sequelize(config.db.NAME, config.db.U_NAME, config.db.U_PWD, {
  host: config.db.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

exports = module.exports = sequelize 
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
//   });
