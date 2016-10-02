export default (router) => router.map({
  '/': {
    name: 'index',
    component: require('./view/index')
  },
    '/index': {
    component: require('./view/index')
  },
  '/user': {
    component: require('./view/user')
  },
  '/newArticle': {
    component: require('./view/newArticle')
  },
  '/image': {
    component: require('./view/image')
  },
  '/newImage': {
    component: require('./view/newImage')
  },
  'imageCategory':{
    component:require('./view/imageCategory')
  },
  '/video': {
    component: require('./view/video')
  },
  '/newVideo': {
    component: require('./view/newVideo')
  },
  'videoCategory':{
    component:require('./view/videoCategory')
  },
  '/editContent/:type/:id': {
    component: require('./view/editContent'),
  },
  '/login': {
    name: 'login',
    component: require('./view/login')
  },
  '/signup': {
    name: 'signup',
    component: require('./view/signup')
  },
  '*': {
    name: '404',
    component: require('./view/404')
  },
  '/updateCode': {
    component: require('./view/updateCode')
  },
  '/changePwd':{
    component: require('./view/changePwd')
  },
  '/comments':{
    component:require('./view/comments')
  }
})
