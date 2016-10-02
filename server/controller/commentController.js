'use strict'
const send = require('../util/errHandler')
const comment = require('../model/comment')
const co = require('co')
const category = require('../model/category')
exports = module.exports = {
 
  edit: function(req, res) {
    console.log(req.body)
    let query = {
      id: req.body.id
    }
    let data = {
      title: req.body.title,
      code: req.body.code,
      cid: req.body.cid,
      description: req.body.description,
      thumbnail: req.body.thumbnail
    }
    if (req.body.id) {
      var result = comment.update({ id }, data)
    } else {
      var result = comment.create(data)
    }
    result
      .then(function(data) {
        res.end(send.success({ file: data.path }))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  },
  all: function(req, res) {
    let d = req.query
    console.log('request all comments : ', d)
    let page = d.page || 1
    let query = {}
    if (d.status !== undefined)
      query.status = d.status
    if (d.categoryId) {
      query.categoryId = d.categoryId
    } else {
      // if
    }
    if (d.commentName) {
      query.title = {
        $like: `%${d.commentName}%`
      }
    }
    comment.findAll(query, page)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
  num: function(req, res) {
    let query = { status: 1 }
    comment.count(query)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
  change: function(req, res) {
    let d = req.body
    let query = {
      id: d.id
    }
    let update = {}
    if (d.status) {
      update.status = d.status
    }
    comment.update(query, update)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },

  detail: function(req, res) {
    let query = {
        id: req.query.id
      }
      // co(function*(){
      //  let commentDetail = yield comment.findOne(query)
      //  let fatherId = yield category.getId(commentDetail.cid)
      //  commentDetail.fid = fatherId
      //   res.end(send.success(commentDetail))
      // }) 
    comment.findOne(query)
      // .then(category.getId)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        console.log(msg)
        res.end(send.err(msg))
      })
  }
}
