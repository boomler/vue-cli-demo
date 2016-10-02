"use strict"
const user = require('../model/user')
const _crypto = require('./crypto')
const co = require('co')
exports = module.exports = {
  getToken: function(name) {
    let token = _crypto.md5(name + new Date().getTime())
    co(
      function*() {
        let c = yield user.setToken(name, token)
      }
    )
    return {
      token: token,
      name: name
    }
  },
  checkToken: function(req) {

    var token = req.body.token || req.params.token || ''
    if (!token)
      return false
    if (req.session.token) {
      return req.sesion.token === token
    }
  }
}
