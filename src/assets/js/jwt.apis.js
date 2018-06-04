
import * as urls from './jwt.urls'
import {phtServer} from './phtServer'


/**
 * 获取首页公告
 * @param NOTICE_TYPE
 * @param CUST_TYPE
 * @param CURR_PAGE_NUM
 * @param PER_PAGE_SIZE
 */

function getNotice(NOTICE_TYPE,CUST_TYPE,CURR_PAGE_NUM,PER_PAGE_SIZE){
  return phtServer.globalPostData(urls.api_url_getnotice, phtServer.submitData({
    "NOTICE_TYPE": NOTICE_TYPE,
    "CUST_TYPE": CUST_TYPE,
    "CURR_PAGE_NUM": CURR_PAGE_NUM,
    "PER_PAGE_SIZE": PER_PAGE_SIZE,
  }))
}



/**
 * 获取首页数据统计
 */

function getDataStatistics(){
  return phtServer.globalPostData(urls.api_url_dataStatisticss, phtServer.submitData({
  }))
}



/**
 * 获取首页推荐项目
 */

function recommendedProject(){
  return phtServer.globalPostData(urls.api_url_recommendedProject, phtServer.submitData({
  }))
}





/**
 *发送验证码
 * @param MOBILE
 * @param USER_TYPE
 * @param VALID_TYPE
 * @returns {*}
 */
function sendMessageMobileValidCode(MOBILE,USER_TYPE,VALID_TYPE) {
  return phtServer.globalPostData(urls.api_url_sendMessageMobileValidCode,phtServer.submitData({
    "MOBILE": MOBILE,
    "USER_TYPE": USER_TYPE,
    "VALID_TYPE": VALID_TYPE
  }))
}

/**
 * 融资端注册
 * @param MOBILE 
 * @param LOGIN_CODE
 * @param PASSWORD
 * @param NEWPASSWORD
 * @param MOBILE_VER_CODE
 * @param RECO_TEL
 * @param CHANNEL
 * @param ASSURE_COMPANY
 * @param USER_ROLE
 * @param TRUSTEE_ID
 * @param TRUSTEE_TYPE
 * @param redirectUrl
 */
function newAddPersonXW(MOBILE,LOGIN_CODE,PASSWORD,NEWPASSWORD,MOBILE_VER_CODE,RECO_TEL,CHANNEL,ASSURE_COMPANY,USER_ROLE,TRUSTEE_ID,TRUSTEE_TYPE,redirectUrl) {
  return phtServer.globalPostData(urls.api_url_newAddPersonXW, phtServer.submitData({
    "MOBILE": MOBILE,
    "LOGIN_CODE": LOGIN_CODE,
    "PASSWORD": PASSWORD,
    "NEWPASSWORD": NEWPASSWORD,
    "MOBILE_VER_CODE": MOBILE_VER_CODE,
    "RECO_TEL": RECO_TEL,
    "CHANNEL": CHANNEL,
    "ASSURE_COMPANY": ASSURE_COMPANY,
    "USER_ROLE": USER_ROLE,
    "TRUSTEE_ID": TRUSTEE_ID,
    "TRUSTEE_TYPE": TRUSTEE_TYPE,
    "redirectUrl": redirectUrl,
  }))
}

/**
 * 新用户注册
 * @param MOBILE
 * @param LOGIN_CODE
 * @param PASSWORD
 * @param NEWPASSWORD
 * @param MOBILE_VER_CODE
 * @param RECO_TEL
 * @constructor
 */
function XWnewAddPerson(MOBILE,LOGIN_CODE,PASSWORD,NEWPASSWORD,MOBILE_VER_CODE,RECO_TEL) {
  return phtServer.globalPostData(urls.api_url_newAddPersonXW, phtServer.submitData({
    "MOBILE": MOBILE,
    "LOGIN_CODE": LOGIN_CODE,
    "PASSWORD": PASSWORD,
    "NEWPASSWORD": NEWPASSWORD,
    "MOBILE_VER_CODE": MOBILE_VER_CODE,
    "RECO_TEL": RECO_TEL
  }))

}

/**
 * 移动端获取banner图
 * @param FILE_TYPE
 */
function getBanner(FILE_TYPE) {
  return phtServer.globalPostData(urls.api_url_getbanner, phtServer.submitData({
    "FILE_TYPE": FILE_TYPE,
  }))
}

/**
 * 获取撮合资金
 */
function queryMainPageTotalData() {
  return phtServer.globalPostData(urls.api_url_queryMainPageTotalData, phtServer.submitData({
  }))
}

/**
 * 新网异步是否返回
 * @param REQUEST_NO
 * @param METHOD_NAME
 */
function queryNewAddPersonAsync(REQUEST_NO,METHOD_NAME) {
  return phtServer.globalPostData(urls.api_url_queryNewAddPersonAsync, phtServer.submitData({
    "REQUEST_NO": REQUEST_NO,
    "METHOD_NAME": METHOD_NAME,
  }))

}

export  {
  sendMessageMobileValidCode,
  newAddPersonXW,
  XWnewAddPerson,
  getBanner,
  queryMainPageTotalData,
  queryNewAddPersonAsync,
  getNotice,
  getDataStatistics,
  recommendedProject

}
