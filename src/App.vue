<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: { Header, Footer },
  data() {
    return {}
  },
  mounted() {
    // 派发一个action，获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
</style>
