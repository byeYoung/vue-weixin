//公共方法
import Jsrsasign,{KJUR,hex2b64} from 'jsrsasign';
import axios from '../../http/axios'
import store from '../../vuex/store'
import md5 from 'js-md5'
import wx from 'weixin-js-sdk'

let phtServer = {}

/*
* get请求
* */
phtServer.globalGetData = function (url) {
  let deferred = $.Deferred();
  let promise = deferred.promise();
  axios.get(url).then((data) => {
    deferred.resolve(data)
  }, (err) => {
    deferred.resolve(err)
  })
  return promise
}
/*
* post请求
* */
phtServer.globalPostData = function (url, data) {
  //新建一个Deferred 对象
  let deferred = $.Deferred();
  //原来的deferred对象上返回另一个deferred对象；没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数对象上部署deferred接口。
  let promise = deferred.promise();
  axios.post(url,data).then((data) => {
    //改变Deferred对象的执行状态
    deferred.resolve(data.data.response)
  }, (err) => {
    deferred.resolve(err);
  });
  return promise
}
/*
* 参数加签名
* */
phtServer.addSign = function (params) {
  function objKeySort(params) {
    let newkey = Object.keys(params).sort();
    let newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = params[newkey[i]];
    }
    return newObj;
  }
  let prvKey = `-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOIExUg6h3Y1sCfnSMe/GNW7RH1IVNisb36nBmOWSVOekFZ7gnRAZgtE4om/F6D+QdwL0j4Ls/NhozjsHi6/JGkPUWdUjafOvjv1dUcql1poxnhN/vEJsIa3WQjHXxVionxJjjO2fMj7wS6AXdbmSf62PtEq8JC4ZzUGuKhDqX2MwxhM6plFgcgAc1qtX3eRTvLi8+LR4xrqmHmDyMUe6ZFboNcPD+MGcIy5LCRkvrBAc5CwQ5N77NexGmHeoi8LImRRYALXFbzRt9odxdA0jajRreBJJZ8mA1tiaemyrnropQH9VWt/3tDif8EApIPNb6E06R+1mnNlE7FhUmuoxjAgMBAAECggEAaxd/LHeAK2WcIAb0/x4tZtxgvXcvcrxNLGVkiEJave7C3KXIpx2kyJ1T/1lx3Q24T4r5ed1OelTj7VF2Wux6xB1Z77A0Ux2qCRQWU7WKZvI1/ZKrwdF7YB7ImUCdZloMraZ/pUkP752mk4BtWuphu/Z8dxiK93/NsXo5bkgwdlVv3l6ArsxgtFwlJwAhCB4Rkm+FG55sLDPFiiw0+5gIQbETVx7/ylqpngjYMMEBgvfY95iOSmugU/+x4kMQq5xooTBQ2gk0V4fsh+qeUccIQ7T0/MmoUWs6c4H+oDr0148sniTa0vxzV0uuA7CuQ5trDERBsTs3U0ruIH74YrK6gQKBgQDHFOHDxT/vuku7eNpjH1Bdl03WCJHv0MCzlktNJKwhj+h3w1TQy3wk77Br7DpybFnqhy//wLv8JP+Ws4GHjZVhLlfvo/s2aAJgAXM26s7YEloOG+sfVt7fuZINTCDmkHaN2OunY9qTGqctRjaMeBijmwFGi8R2C3FqtxthzPRq4QKBgQC2wsDjEkvt3qYWvXCoN+SRZKo9TYR/Kf0uuAc2t9G97k5WntOF9FZdR519EfJ/gn5hKzzqBDR/B1R/IvvW/lbIvlDmz9pGelaJQzlYUL1kqw7/BY/Gda19hrQvNUseDw5os8mkR/2+VApSoAqwRfoiOV11uNJjQi03qN+1LVyDwwKBgAm2JhFDxQuvvdQGYDjnpSb7o4tmXaAiQdRA56l6uX7lo0R8Xd3Vn1e57ZRGMM+2I2jCcX/7afAx6dnzJcV0Da5w8U86Y53S0xLV30X1jGOT+Zqol/6uYS7uwYYuiYhV0cK3qz8+KsJ0UWVvAGg3z5PjkttbJBlSE5VOG2LY+a9hAoGAQ2nHGHsxQsaz4QNzwLkNOIw3N3GWhAmK+GatUoOvfC2g+9aOE4UzLikycGXkWyBZWaJHT9LJQmoDwvm2h3E9tcJtuRXGX+TUcsE3L9poYe+vEmaMyBm0Ku87G4a+9JF9MSXQJSbg9Amv3RZnmunVADbEwJ2yDSbl4vgJvJzE2V0CgYEAhlfJ7FrQQTRdq0g4/6a6EFotzUBGnBdS2K3Eh65ixHvw47L/zwoOwHNUd1el+2W4r18EgY5jIF0jvuiv6qTcTGO48izn1Q3cdtCfk5a8BSpu5jIsB9TPZ2pewkhyzcuGe7SfM3K9vxZMWtAud8pR0Jq2G7HUBM+uV+savJ7mxMI=-----END PRIVATE KEY-----`
  let sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA","prov": "cryptojs/jsrsa"});
  sig.init(prvKey);
  let paramsInfo =objKeySort(params.params)
  let paramsData ={}
  paramsData.params =paramsInfo
  sig.updateString(JSON.stringify(objKeySort(paramsData)));
  let signs = Jsrsasign.hex2b64(sig.sign())
  let sign = encodeURIComponent(signs ,"UTF-8")
  return sign
}
/**
 * 格式化数据
 */
phtServer.submitData =function (params) {
  let submitData ={};
  submitData.header ={
    "clientid": "",
    "device": "pc",
    "platform": "web",
    "projectid": "project_platform",
    "version": "1.0"
  }
  submitData.request={}
  submitData.request = {"params":params}
  submitData.saveOperTokenCode =''
  submitData.tokenCode =''
  submitData.sign = phtServer.addSign( submitData.request)
  return submitData
};
/**
 * 存储localStorage
 */
phtServer.setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
phtServer.getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
phtServer.removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 判断手机号
 */
phtServer.reg_mobile =function (mobile) {
  if (!mobile) return;
  let reg =/^0?(1[3-9][0-9])[0-9]{8}$/;
  return reg.test(mobile)

};

/**
 * 判断密码
 */
phtServer.reg_password =function (password) {
  if (!password) return;
  let reg =/^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\\W].*)(?=.*[0-9\\W].*).{8,16}$/;
  return reg.test(password)

};
/*
* md5加密
* */
phtServer.CalcuMD5 = function (pwd) {
  var totleStr = "WUJIANDONG20150101PHTFDATA";
  pwd = pwd.toUpperCase();
  pwd = pwd.replace(/0/g, '~').replace(/1/g, '$').replace(/2/g, '!').replace(
    /3/g, '@').replace(/4/g, ':').replace(/5/g, ']').replace(/6/g, '[')
    .replace(/7/g, '{').replace(/8/g, '}').replace(/9/g, '`');
  totleStr = totleStr.substring(0, totleStr.length - pwd.length);
  pwd = totleStr + pwd;
  pwd = md5(pwd);
  return pwd;
}
phtServer.CalcuMD5lower = function (pwd) {
  var totleStr = "WUJIANDONG20150101PHTFDATA";
  pwd = pwd.replace(/0/g, '~').replace(/1/g, '$').replace(/2/g, '!').replace(
    /3/g, '@').replace(/4/g, ':').replace(/5/g, ']').replace(/6/g, '[')
    .replace(/7/g, '{').replace(/8/g, '}').replace(/9/g, '`');
  totleStr = totleStr.substring(0, totleStr.length - pwd.length);
  pwd = totleStr + pwd;
  pwd = md5(pwd);
  return pwd;
}

/**
 *
 * 微信开发sdk的引入
 */

phtServer.initWxJsAPI =function () {
  let deferred = $.Deferred();
  let promise = deferred.promise();
  wx.config({
    debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId : 'wx8f11eee482052822', // 必填，公众号的唯一标识
    timestamp : '1520233958', // 必填，生成签名的时间戳
    nonceStr : 'BpDYxYFzerGJeWAp6CSpwyFBdydtsiyQ', // 必填，生成签名的随机串
    signature :'f73f526d93dbd19e9c0235dd11ab10fe9f3ef6f8',// 必填，签名，见附录1
    jsApiList :['getNetworkType','scanQRCode']//必填，需要使用的JS接口列表
  });
  wx.ready(function () {
    deferred.resolve(wx);
  });
  return promise;
}
/**
 * 获取网络状态
 */
phtServer.getNetworkType=function(){
  wx.getNetworkType({
    success: function (res) {
      //let networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
      return res;
    }
  });
}
/**
 * 打开扫码
 */
phtServer.scanQRCode=function () {
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
     alert(res); // 当needResult 为 1 时，扫码返回的结果
    }
  });
}

export {phtServer}
