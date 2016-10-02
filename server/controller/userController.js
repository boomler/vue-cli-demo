"use strict"

const _crypto = require('../util/crypto')
const _token = require('../util/token')
const user = require('../model/user')
const send = require('../util/errHandler')
const co = require('co')
exports = module.exports = {
  login: function(req, res) {
    console.log('bbbbbb')
    let u = {
      name: req.body.name,
      pwd: _crypto.md5(req.body.pwd)
    }
    console.log(u)
    user.checkUser(u).then(function(data) {
      if (data && data.dataValues) {
        let token = data.dataValues.token || _token.getToken(data.dataValues.name)
        console.log(`token : ${token}`)
        req.session.token = token
        res.end(send.success({ token }))
      } else {
        res.end(send.err('用户名或密码错误'))
      }
    })

  },
  // 
  signup: function(req, res) {

    let u = {
      name: req.body.name,
      pwd: _crypto.md5(req.body.pwd),
      reg_time: new Date().getTime()
    }
    co(
      function*() {
        yield user.add(u).catch(function(msg) {
          res.end(send.err(msg))
        })
        let token = _token.getToken(u.name)
        console.log(`token: ${token}`)
        let data = token
        res.end(send.success(data))
      }
    )

  },
  all: function(req, res) {
    var query = {
      page: req.query.page || 1
    }
    var d = req.query
    d.status !== undefined?query.status = d.status :''
    if(d.email !== undefined){
      query.email =  
        {
        $like: `%${d.email}%`
      }
    }
        if(d.name !== undefined){
      query.name =  
        {
        $like: `%${d.name}%`
      }
    }
  
    console.log(query)
    user.allUser(query)
      .then(function(data) {
        res.end(send.success(data))

      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  },
  changeStatus(req, res) {
    let uid = req.body.id
    let status = req.body.status
    user.update({ id: uid }, { status: status })
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
  count(req,res){
    var query = {}
    if(req.query.status !==undefined){
      query.status = req.query.status
    }
     if(req.query.name !==undefined){
      query.name = req.query.name
    }
     if(req.query.email !==undefined){
      query.email = req.query.email
    }
    user.count(query)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  }
}
