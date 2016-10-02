'use strict'
const shell = require('shelljs/global')
exports = module.exports = {
    updateFe(req, res) {
      if (!which('git')) {
        console.log('Sorry, this script requires git')
        exit(1)
      } else {
        let msg1 = cd('/home/www/multi_media/server')
        // let msg2 = exec('git reset --hard')
        let msg3 = exec('git pull origin fe_dev')
        res.end(JSON.stringify({data:msg3}))
      }
 
  },
  updateServer() {}
}
