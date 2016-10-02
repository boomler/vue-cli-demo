'use strict'
const send = require('../util/errHandler')
const video = require('../model/video')
const co = require('co')
const category = require('../model/category')
exports = module.exports = {
  create: function(req, res) {
    console.log(req.body)
    video.create(req.body)
      .then(function(data) {
        res.end(send.success({ file: data.path }))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
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
      categoryId: req.body.categoryId,
      thumbnail: req.body.thumbnail
    }
    if (req.body.id) {
      var result = video.update({ id: req.body.id }, data)
    } else {
      var result = video.create(data)
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
    console.log('request all videos : ', d)
    let page = d.page || 1
    let query = {}
    if (d.status !== undefined)
      query.status = d.status
    if (d.categoryId) {
      query.categoryId = d.categoryId
    } else {
      // if
    }
    if (d.videoName) {
      query.title = {
        $like: `%${d.videoName}%`
      }
    }
    video.findAll(query, page)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
  num: function(req, res) {
    let d = req.query
    let query = {}
    if (d.status !== undefined)
      query.status = d.status
    if (d.categoryId) {
      query.categoryId = d.categoryId
    } else {
      // if
    }
    if (d.videoName) {
      query.title = {
        $like: `%${d.videoName}%`
      }
    }
    video.count(query)
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
    if (d.priority) {
      update.priority = d.priority
    }
    if (d.position) {
      update.position = d.position
    }


    video.update(query, update)
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
      //  let videoDetail = yield video.findOne(query)
      //  let fatherId = yield category.getId(videoDetail.cid)
      //  videoDetail.fid = fatherId
      //   res.end(send.success(videoDetail))
      // }) 
    video.findOne(query)
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
