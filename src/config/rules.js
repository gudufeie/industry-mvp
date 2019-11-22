let rules = {
    // 手机号验证
  validateMobilePhone(value, callback){
    if (value === '') {
      callback('负责人手机号不可为空');
    } else {
      if (value !== '') { 
        var reg=/^1[3456789]\d{9}$/;
        if(!reg.test(value)){
          callback('请输入有效的手机号码');
        }else{
          callback('');
        }
      }else{
        callback('');
      }
    }
  },

  //邮箱验证
  validateEmail(value, callback){
    if (value !== '') { 
      var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(!reg.test(value)){
        callback('请输入有效的邮箱');
      }else{
        callback('');
      }
    }else{
      callback('');
    }
  },


  // 微信号验证
  validateWeixin(value, callback){
    if(value !== ""){
      var reg= /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
      if(!reg.test(value)){
        callback('请输入正确的微信号码');
      }else{
        callback('');
      }
    }else{
      callback('');
    }
  },

  // QQ号验证
  validateQQ(value, callback){
    if(value !== ""){
      var reg= /^[0-9]{5,12}$/;
      if(!reg.test(value)){
        callback('请输入正确的QQ号码');
      }else{
        callback('');
      }
    }else{
      callback('');
    }
  },

 // 日期验证-年月日
 validateDate(value, callback){
  if(value !== ""){
    var reg= /^[1-9]\d{3}年(0[1-9]|[1-9]|1[0-2])月(0[1-9]|[1-9]|[1-2][0-9]|3[0-1])日$/;
    if(!reg.test(value)){
      callback('请输入正确的日期');
    }else{
      callback('');
    }
  }else{
    callback('');
  }
}
}
export default rules

