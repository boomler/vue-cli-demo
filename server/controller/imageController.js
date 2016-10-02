'use strict'
const send = require('../util/errHandler')
const image = require('../model/images')
exports = module.exports = {
  newImage: function(req, res) {
    console.log(req.body)
    image.create(req.body)
      .then(function(data) {
        res.end(send.success(data))
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
      thumbnail: req.body.thumbnail,
      description: req.body.description,
      categoryId: req.body.categoryId,
      img: req.body.img
    }
    image.update(query,data)
      .then(function(data) {
        res.end(send.success({ file: data.path }))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  },
  all: function(req, res) {
    let d =  req.query
    let page = d.page || 1
    console.log('request all pics : ',d)
    let query = {}
    if (d.status !== undefined)
      query.status = d.status
    if (d.categoryId){
      query.categoryId = d.categoryId
    }else{
      // if
    }
    if (d.imageName){
      query.title =    {
        $like: `%${d.imageName}%`
      }
    }
    image.findAll(query, page)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  },
  num: function(req, res) {
    let d = req.query
    console.log('request nums : ', d)
    let page =d.page || 1
    let query = {
      status:d.status || 1
    }

    image.count(query)
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
      id:d.id
    }
    let update = {}
    if(d.status){
      update.status = d.status
    }    
    if(d.priority){
      update.priority = d.priority
    }
        if(d.position){
      update.position = d.position
    }
 
    image.update(query, update)
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
    image.findOne(query)
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })
  }
}
