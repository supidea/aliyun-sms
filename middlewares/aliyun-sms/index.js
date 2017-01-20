const request = require('request')
const crypto = require('crypto')

class AliSms {
  constructor (config) {
    this.Access_Key_Secret = config.Access_Key_Secret || ''
    this.api_url = 'https://sms.aliyuncs.com/'
    this.opts = {
      Action: 'SingleSendSms',
      Format: 'JSON',
      Version: '2016-09-27',
      AccessKeyId: config.Access_Key_ID || '',
      SignatureMethod: 'HMAC-SHA1',
      SignatureVersion: '1.0'
    }
  }
  // 生成签名
  sign (options, httpMethod) {
    var signStr = this.queryStr(options)
    var StringToSign = httpMethod + '&'+ encodeURIComponent('/') + '&'+encodeURIComponent(signStr)
    let signature = crypto.createHmac('sha1',this.Access_Key_Secret+'&').update(new Buffer(StringToSign, 'utf-8')).digest('base64')
    return signature
  }
  // 生成参数查询字符串
  queryStr (options) {
    var arr = Object.keys(options).sort()
    var queryStr = arr.map(key => {
      if (typeof options[key] === 'object') {
        options[key] = JSON.stringify(options[key])
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(options[key])
    }).join('&')
    return queryStr
  }
  // 发送接口
  sender (options, httpMethod='POST') {
    const params = Object.assign(this.opts, options, {Timestamp: this.getTimeStamp(), SignatureNonce: this.getNonce()})
    params.Signature = this.sign(params, httpMethod)
    return new Promise((resolve, reject) => {
      request({
        url: httpMethod == 'POST' ? this.api_url : `${this.api_url}?${this.queryStr(params)}`,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded' 
        },
        method: httpMethod,
        form: params
      }, (error, response, body) => {
        error ? reject(error) : resolve(body)
      })
    })
  }
  // 请求的时间戳 格式为YYYY-MM-DDThh:mm:ssZ
  getTimeStamp () {
    const time = new Date()
    var timeStamp = ''
    timeStamp += time.getUTCFullYear()
    timeStamp += '-'
    timeStamp += ('0'+(time.getUTCMonth()+1)).slice(-2)
    timeStamp += '-'
    timeStamp += ('0'+time.getUTCDate()).slice(-2)
    timeStamp += 'T'
    timeStamp += ('0'+time.getUTCHours()).slice(-2)
    timeStamp += ':'
    timeStamp += ('0'+time.getUTCMinutes()).slice(-2)
    timeStamp += ':'
    timeStamp += ('0'+time.getUTCSeconds()).slice(-2)
    timeStamp += 'Z'
    return timeStamp
  }
  // 生成随机数
  getNonce () {
    return Math.floor(Math.random() * 1e16)
  }
}

module.exports = AliSms
