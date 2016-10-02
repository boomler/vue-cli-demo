const send = require('../util/errHandler')
const file = require('../model/file')
exports = module.exports = {
    image: function(req, res) {
        console.log(req.file)
        req.file.path = req.file.path.replace('/home/www/multi_media/server/dist', '')
        file.newFile(req.file)
            .then(function(data) {
                res.end(send.success({ file: data.path }))
            })
            .catch(function(msg) {
                res.end(send.err(msg))
            })
    }
}
