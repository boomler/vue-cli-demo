"use strict"

const _crypto = require('../util/crypto')
const _token = require('../util/token')
const admin = require('../model/admin')
const send = require('../util/errHandler')
const co = require('co')
exports = module.exports = {
  login: function(req, res) {
    let u = {
      name: req.body.name,
      pwd: _crypto.md5(req.body.pwd)
    }
   req.session.name = null
    
      admin.checkadmin(u).then(function(data) {
        if (data && data.dataValues) {

          req.session.name = u.name
          console.log('set session:', req.session.name)
          res.end(send.success({ status: 1 }))
        } else {
          res.end(send.err('用户名或密码错误'))
        }

      })
 
  },
  changePwd: function(req, res) {
    let where = {
      name: req.session.name,
      pwd: _crypto.md5(req.body.pwd)
    }

    let data = {
      pwd: _crypto.md5(req.body.newPwd)
    }
    admin.update(where, data)
      .then(function(d) {
        if (d[0] == 0) {
          res.end(send.err('当前密码输入错误'))
        } else {
   req.session.name = null
            
          res.end(send.success(d))
        }

      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  }

}
