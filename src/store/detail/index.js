import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit("GETGOODINFO", result.data)
    }
  },
  // 添加至购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(('fail')))
    }
  }
}
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品销售属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }

}

export default {
  state,
  mutations,
  actions,
  getters,
}