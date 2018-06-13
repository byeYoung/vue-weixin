import * as types from '../types'
import {phtServer} from '../../assets/js/phtServer'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(phtServer.getStore('loginStatus'))|| false,
  // 用户登录信息
  userInfo: JSON.parse(phtServer.getStore('userInfo')) || {},
  // 用户数据信息
  userData: [],
  //用户的token
  tokenCode: null,
  //用户实名状态
  isRealName: null,
  //实名的url
  isRealNameUrl:null,
  //判断是否需要登陆是否需要实名然后然后去哪
  accessAuth:JSON.parse(phtServer.getStore('accessAuth')) || {},
  //微信授权登陆code
  wxCode : phtServer.getStore('wxCode') || null,
  xwBank:null

}

const actions = {
  /**
   * 用户登录
   * @param commit
   * @param res
   *
   */
  setUserInfo({commit}, res) {
    phtServer.setStore('userInfo', res)
    phtServer.setStore('loginStatus', true)
    //要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
    commit(types.SET_USER_INFO, res)
    commit(types.SET_LOGIN_STATUS, true)
  },

  /**
   * 退出登录
   * @param commit
   */
  setSignOut({commit}) {
    phtServer.removeStore('loginStatus')
    phtServer.removeStore('userInfo')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  },
  /**
   * 获取tokenCode
   * @param commit
   * @param res
   */
  getTokenCode({commit}, res) {
    commit(types.SET_TOKEN_CODE, res)
  },
  /**
   * 获取用户实名状态
   * @param commit
   * @param res
   */
  setIsRealName({commit}, res) {
    commit(types.SET_IS_REAL_NAME, res)

  },
  /**
   * 新网实名URL
   * @param commit
   * @param res
   */
  setIsRealNameUrl({commit},res){
    commit (types.SET_XW_URL,res)
  },
  /**
   * 判断用户状态
   * @param commit
   * @param res
   */
  setAccessAuth({commit},res){
    phtServer.setStore('accessAuth', res)
    commit (types.SET_ACCESSAUTH,res)
  },
  /**
   * 用于微信登陆的code
   * @param commit
   * @param res
   */
  setwxCode({commit},res){
    phtServer.setStore('wxCode', res)
    commit (types.SET_WXCODE,res)
  },
  /**
   * 新网提示信息
   * @param commit
   * @param xwBank
   * @constructor
   */
  USER_XW_BANK( { commit }, xwBank ){
    commit(types.USER_XW_BANK, xwBank)

  },


}

const getters = {
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  tokenCode: state => state.tokenCode,
  isRealName: state => state.isRealName,
  isRealNameUrl:state =>state.isRealNameUrl,
  accessAuth:state =>state.accessAuth,
  wxCode:state => state.wxCode,
  //新网提示信息
  xwBank:state =>state.xwBank,
}

const mutations = {
  /**
   * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
   * 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
   * @param state
   * @param res
   */
  /**
   * 用户信息
   * @param state
   * @param res
   */
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },
  /**
   * 用户的登陆状态
   * @param state
   * @param status
   */
  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },
  /**
   * 接口的tokenCode
   * @param state
   * @param status
   */
  [types.SET_TOKEN_CODE](state, status) {
    state.tokenCode = status
  },
  /**
   * 实名状态
   * @param state
   * @param status
   */
  [types.SET_IS_REAL_NAME](state, status) {
    state.isRealName = status
  },
  /**
   * 新网实名URl
   * @param state
   * @param status
   */
  [types.SET_XW_URL](state, status) {
    state.isRealNameUrl = status
  },
  /**
   * 判断用户的登陆实名状态
   * @param state
   * @param status
   */
  [types.SET_ACCESSAUTH](state, status) {
    state.accessAuth = status
  },
  /**
   * 微信code
   * @param state
   * @param status
   */
  [types.SET_WXCODE](state, status) {
    state.wxCode = status
  },
  //xwBank
  [types.USER_XW_BANK] ( state, xwBank){
    state.xwBank = xwBank

  }


}

export default {
  state,
  actions,
  getters,
  mutations
}
