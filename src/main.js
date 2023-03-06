import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
import { Button, MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload';
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数:全局组件的名字  第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button);
//饿了吗注册组件时，还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入MockServe.js  ----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// Vue.config.productionTip = false
// 测试
import * as API from '@/api'
// console.log(reqGoodsInfo())
// reqCategoryList()

import '@/plugins/validate'

import dog from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: dog
})
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

  },
  router,
  store
}).$mount('#app')
