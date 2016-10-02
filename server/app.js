"use strict"
const express = require('express')
const config = require('./config')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multer = require('multer')
const user = require('./controller/userController')
const file = require('./controller/fileController')
const image = require('./controller/imageController')
const video = require('./controller/videoController')
const admin = require('./controller/adminController')
const relation = require('./controller/relationController')
const comment = require('./controller/commentController')

const category = require('./controller/categoryController')
const content = require('./controller/contentController')

const git = require('./util/git')
var app = express()
app.use('/', express.static(__dirname + '/dist'))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 * 10 },
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(cookieParser())



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/dist/uploads/img')
    },
    filename: function(req, file, cb) {
        let fileType = file.originalname.split('.').pop()
        cb(null, `${Date.now()}.${fileType}`)
    }
})
const upload = multer({ storage: storage })

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8090")
//     // res.header("Access-Control-Allow-Origin", "http://boomler.wang:7000")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
//     res.header("Access-Control-Allow-Credentials", "true")
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/jsoncharset=utf-8")
//     console.log('where is my session:', req.session.name)
//     console.log('sssssssssssssssssssssss')
//     next()
// })

//处了注册和登录 
app.use(function(req, res, next) {
    if (req.url == '/login') {
        next()
    } else {
        let name = req.session.name
            // console.log(req.session)
        if (!name) {
            res.sendStatus(403)
        } else {
            next()
        }
    }
})

app.post('/changePwd', admin.changePwd)
app.post('/login', admin.login)

app.post('/userLogin', user.login)

app.get('/users', user.all)
app.post('/changeUserStatus', user.changeStatus)
app.get('/userCount', user.count)

app.post('/upload', upload.single('img'), file.image)
app.post('/mewImage', image.newImage)
app.post('/editImage', image.edit)
app.get('/image', image.all)
app.get('/imageCount', image.num)
app.post('/changeImage', image.change)
app.get('/imageDetail', image.detail)

app.post('/newVideo', video.create)
app.get('/videoDetail', video.detail)
app.get('/video', video.all)
app.get('/videoCount', video.num)
app.post('/changeVideo', video.change)
app.post('/editVideo', video.edit)


app.get('/category', category.all)
app.post('/addCategory', category.add)
app.post('/delCategory', category.del)

app.get('/content/:type/:id', content.getDetail)
app.post('/content/:type/:id', content.add)

app.get('/relation/:type/:id', relation.all)
app.post('/addRelation', relation.add)
app.post('/rmRelation', relation.rm)

app.get('/comment',comment.all)
app.get('/commentNum',comment.num)
app.post('/changeComment',comment.change)

 
// 更新服务器代码
app.get('/fe',git.updateFe)
app.get('/server',git.updateServer)

app.listen(config.PORT, function() {
    console.log(`listening on PORT: ${config.PORT}`)
})
