import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'


// 使用插件
Vue.use(VueRouter)



// 先把VueRouter原型对象的push，先保存一份
let originalPush = VueRouter.prototype.push
let originalReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数，告诉原来push方法，你往哪里跳转(传递哪些参数)
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call|apply的区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号，apply方法执行，传递数据

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originalPush.call(this, location, resolve, reject);
  } else {
    originalPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originalReplace.call(this, location, resolve, reject)
  } else {
    originalReplace.call(this, () => { }, () => { })
  }
}

let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  // next()
  // console.log(store);
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已经登录，去login，不能去
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 登录去的不是login
      // 如果用户名已有   
      if (name) {
        next()
      } else {
        //   // 没有用户信息，派发action让仓库存储用户信息在跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录,不能去交易相关，不能去支付相关pay，paysuccess，个人中心
    let toPath = to.path
    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router