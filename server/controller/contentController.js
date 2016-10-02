'use strict'
const image = require('../model/images')
  const video = require('../model/video')
const send = require('../util/errHandler')

exports = module.exports = {
  getDetail: function(req, res) {
    let type = req.params.type
    let id = req.params.id
    console.log(`${type}+++++++${id}`)
    let db = type == 1 ? image : video
    db.findOne({ id })
      .then(function(data) {
        res.end(send.success(data))

      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  },
  add: function(req, res) {
    let type = req.params.type
    let id = req.params.id
    let content = req.body.content
    console.log(`content:${content} id: ${id} type:${type}`)
    let db = type == 1 ? image : video
    db.update({ id },{content})
      .then(function(data) {
        res.end(send.success(data))
      })
      .catch(function(msg) {
        res.end(send.err(msg))
      })

  }

}
