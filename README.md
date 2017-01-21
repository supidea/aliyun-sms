## aliyun-sms
阿里云的SMS（短信服务）的NODEJS SDK

## 使用方法
支持POST,GET

    const aliSms = new AliSms({Access_Key_ID: '密钥id', Access_Key_Secret: '密钥'})
    var options = {
        SignName: '与立科技短信验证',
        ParamString: {
          code: '1234',
          product: '水淀粉'
        },
        RecNum: '18050010619', 
        TemplateCode: 'SMS_42805053'
    };
    // GET 就用 aliSms.sender(options, 'get')
    aliSms.sender(options).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
   
     
## 注意事项
短信验证码 ：使用同一个签名，对同一个手机号码发送短信验证码，支持1条/分钟，累计7条/小时    
短信通知： 使用同一个签名和同一个短信模板ID，对同一个手机号码发送短信通知，支持50条/日；    
推广短信：使用同一个签名和同一个短信模板ID，对同一个手机号码发送短信通知，支持50条/日；      

如果超出这些使用条件，会出现 InvalidSendSms 的错误代码— 触发业务流控
