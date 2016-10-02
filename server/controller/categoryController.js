'use strict'
const send = require('../util/errHandler')
const category = require('../model/category')
exports = module.exports = {
    all: function(req, res) {
      let query = {
        type: req.query.type,
        status: 1
      }
      category.findAll(query)
        .then(function(data) {
          let result = []
            // 拿到一级分类
          data.forEach(function(t) {
              if (t.father == 0) {
                result.push({
                  name: t.name,
                  id: t.id,
                  description:t.description

                })
              }
            })
            // 为一级分类添加子分类
          for (let i = 0, len = result.length; i < len; i++) {
            result[i].childs = []
            data.forEach(function(l) {
              if (l.father == result[i].id) {
                console.log('being herhe', i)
                result[i].childs.push({
                  id: l.id,
                  name: l.name,
                  description:l.description

                })
              }
            })
          }
          res.end(send.success(result))
        })
        .catch(function(msg) {
          res.end(send.err(msg))
        })

    },
    add: function(req, res) {
      if (req.body.child) {
        let condition = { id: req.body.child }
        let data = {
          name: req.body.childname,
          description: req.body.description || ''
        }
        category.update(condition, data)
          .then(function(d) {
            res.end(send.success(d))
          })
          .catch(function(msg) {
            res.end(send.err(msg))
          })
    } else {
      // add 
      let newCategory = {
        father: req.body.father,
        name: req.body.childname,
        type: req.body.type,
        description: req.body.description,
      }
      category.add(newCategory)
        .then(function(data) {
          res.end(send.success(data))
        })
        .catch(function(msg) {
          res.end(send.err(msg))
        })
    }
  },
  del(req, res) {
    let id = req.body.id
    console.log(id)
    if (id) {
      category.update({ id }, { status: 0 })
        .then(function(data) {
          res.end(send.success(data))
        })
        .catch(function(msg) {
          res.end(send.err(msg))
        })

    }
  }
}
