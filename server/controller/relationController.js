'use strict'
const video = require('../model/video')
const image = require('../model/images')
const relation = require('../model/relation')
const send = require('../util/errHandler')
const co = require('co')

exports = module.exports = {
    all(req, res) {

        let type = req.params.type
        let id = req.params.id
        let db = type == 1 ? image : video
        co(function*() {
            // relation.all(type, id).then(function(data){
            // 	 console.log(JSON.stringify(data))
            let allRelation = yield relation.all(type, id)
            allRelation = JSON.parse(JSON.stringify(allRelation))
            let IDs = []
            allRelation.forEach(function(t) {
                if (t.from == id) {
                    IDs.push(t.to)
                } else {
                    IDs.push(t.from)
                }

            })
            db.findAll({ id: { $in: IDs } }, 1)
                .then(function(data) {
                    res.end(send.success(data))
                })
                .catch(function(msg) {
                    res.end(send.err(msg))
                })


            console.log(IDs)
        })



        // .then(function(data) {
        //     res.end(send.success({}))
        // })
        // .catch(function(msg) {
        //     res.end(send.err(msg))
        // })

    },
    add(req, res) {
        let form = {
            from: req.body.from,
            to: req.body.to,
            type: req.body.type
        }
        let db = form.type == 1 ? image : video
        co(function*() {
            let addRelation = yield relation.add(form)
            console.log(addRelation)
            db.findOne({ id: form.to })
                .then(function(data) {
                    res.end(send.success(data))
                })
                .catch(function(msg) {
                    res.end(send.err(msg))
                })
        })
    },
    rm(req, res) {
        let form = {
            from: req.body.from,
            to: req.body.to,
            type: req.body.type
        }
        console.log(form)
        
       form = { $or: [{from:form.from,to:form.to}, {from:form.to,to:form.from}]} 
        
        relation.delete(form)
            .then(function(data) {
                res.end(send.success(data))
            })
            .catch(function(msg) {
                res.end(send.err(msg))
            })

    }
}
