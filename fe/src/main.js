import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'

// 路由
Vue.use(VueRouter)
const router = new VueRouter()

// router.beforeEach(function(transition) {
//   if (location.hash == '#!/login' || location.hash == '#!/signup') {
//     transition.next()
//   } else {

//     if (localStorage.getItem('token') && localStorage.getItem('name')) {
//       transition.next()
//     } else {
//       transition.redirect({ name: 'login' })
//     }
//   }
// })

routerConfig(router)
router.start(App, '#app')
