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
   
