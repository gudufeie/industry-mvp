<template>
  <div class="login-container">
      <h2 class="login-title">百工联运营后台</h2>
      <el-form ref="form" :rules="rules" :model="form"  class="login-form" >
          <el-form-item  prop="username">
              <el-input v-model="form.username"  placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
              <el-input v-model="form.password" type="password"  placeholder="密码"></el-input>
          </el-form-item>
          <div class="remmber"><input type="checkbox" v-model="checked"> <span>记住密码</span></div>
          <el-form-item>
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// import {login, getUserInfo} from '@/api/login'

  export default {
    data() {
      return {
          checked:false,
        form: {
            username: '',
            password: ''
         },
         rules: {
             username: [
                  {required: true, message: '帐号不能为空', trigger: 'blur' },
             ],
             password: [
                 {required: true, message: '密码不能为空', trigger: 'blur' },
             ]
         }
      }
    },
    created() {
        this.init()
    },
    methods: {
      init(){
          if(localStorage.getItem("password") != null && localStorage.getItem("username") != null){
              this.checked=true
              this.form.username=localStorage.getItem("username")
              this.form.password=localStorage.getItem("password")
          }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
            // console.log(valid)
            if (valid) {
                // 提交表单给后台进行验证是否正确
                console.log(this.form.username)
                if(this.form.username == 'admin' && this.form.password=='123456'){
                    // this.setCookie(this.form.username, this.form.password, 7);
                    localStorage.setItem("username", this.form.username)
                    localStorage.setItem("password", this.form.password)
                    this.$router.push('/')
                }else{
                                this.$message({
                                    message: '账号密码不正确',
                                    type: 'warning'
                                })                    
                }
                // login(this.form.username, this.form.password).then(response => {
                //     const resp = response.data 
                //     console.log(resp, resp.flag, resp.data.token,resp.message)
                //     if(resp.flag) {
                //         // 验证成功, 通过token去获取用户信息
                //         getUserInfo(resp.data.token).then(response => {
                //             const respUser = response.data
                //             if(respUser.flag){
                //                 // 获取到了用户的数据
                //                 console.log('userInfo', respUser.data)
                //                 // 1. 保存 token ，用户信息
                //                 localStorage.setItem('mxg-msm-user', JSON.stringify(respUser.data))
                //                 localStorage.setItem('mxg-msm-token', resp.data.token)
                //                 // 前往首页 
                //                 this.$router.push('/')
                //             }else {
                //                 this.$message({
                //                     message: respUser.message,
                //                     type: 'warning'
                //                 })
                //             }
                            
                //         })
                //     }else {
                //         // 未通过，弹出警告
                //         // alert(resp.message)
                //         this.$message({
                //             message: resp.message,
                //             type: 'warning'
                //         });
                //     }
                // })
            }else{
                console.log('验证失败')
                return false
            }
        })
    },
        //设置cookie
    setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
            //读取cookie
    getCookie(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
　　        return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    },
            //清除cookie
    delCookie(name) {
          var exp = new Date()
          exp.setTime(exp.getTime() - 1)
          var cval = this.getCookie(name)
          console.log(cval)
          if (cval != null) {
             //document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
       }
    }
  }
}
</script>

<style scoped>
.remmber{
    text-align: left;
}
.remmber input{
    vertical-align: middle;
}
.login-form {
    width: 350px;
    /* 上下间隙 160px, 左右自动居中 */
    margin: 0px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 28px;
    border-radius: 20px;
    text-align: center;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    /* background: url('../../assets/login.jpg') */
}
.login-title {
    color: #303133;
    text-align: center;
    font-size: 36px;
    margin: 160px 0 20px 0;

}

</style>