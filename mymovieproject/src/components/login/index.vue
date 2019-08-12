<template>
<div class="login-container">
  
    <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
      <div class="title-container">
        
        <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 200px;" stretch tab-position="top">
          <el-tab-pane label="系统登录" name="selectLogin">

            <el-form-item prop="username">
        
              <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
              </span>  
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
              <svg-icon icon-class="password" />
              </span> 
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
              <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
              </span> 
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:40px;float:left;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

          </el-tab-pane>



          <el-tab-pane label="系统注册" name="selectRegister">


            <el-form-item prop="usernameRegister">
        
              <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
              </span>  
              <el-input name="usernameRegister" type="text" v-model="loginForm.usernameRegister"  placeholder="请输入账号" />
            </el-form-item>

            <el-form-item prop="passwordRegister">
              <span class="svg-container">
              <svg-icon icon-class="password" />
              </span> 
              <el-input name="passwordRegister" :type="passwordRegisterType" v-model="loginForm.passwordRegister" placeholder="请输入密码" />
              <span class="show-pwd" @click="showPwdRegister">
              <svg-icon icon-class="eye" />
              </span> 
            </el-form-item>

            <el-form-item prop="passwordRegister2">
              <span class="svg-container">
              <svg-icon icon-class="password" />
              </span> 
              <el-input name="passwordRegister2" :type="passwordRegisterType" v-model="loginForm.passwordRegister2"  placeholder="再次输入密码" />
              <span class="show-pwd" @click="showPwdRegister">
              <svg-icon icon-class="eye" />
              </span> 
            </el-form-item>

             
                <transition name="el-fade-in-linear">
                <div v-show="show" class="transition-box">密码不一致</div>
                </transition>
             

            <el-button type="primary" style="width:100%;margin-bottom:40px;float:right;" :loading="loading" @click.native.prevent="register">注册</el-button>

          </el-tab-pane>
        </el-tabs>
      </div>
      
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  name: 'login',
  data () {
    return {
     loginForm: {
        username: '',
        password: '',
        usernameRegister:'',
        passwordRegister:'',
        passwordRegister2:''
      },
      passwordType: 'password',
      passwordRegisterType: 'password',
      loading: false,
      showDialog: false,
      activeName:'selectLogin',
      show:false
    }
  },methods:{
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showPwdRegister(){
      if (this.passwordRegisterType === 'password') {
        this.passwordRegisterType = ''
      } else {
        this.passwordRegisterType = 'password'
      }  
    },
    //登录
    handleLogin() {
      this.loading = true
      if(this.loginForm.password!=''){
        this.loginForm.password=md5(this.loginForm.password)
      }
      this.$store.dispatch('AC_Login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        this.$router.push({ path: '/' })
      }).catch((err) => {
        this.$store.commit('SHOW_ERROR_TOAST', err.body.message || err.body)        
      }).finally(() => {
        this.loading = false
      })
     },
     register(){
        this.loading = true
        if(this.loginForm.passwordRegister!=''){
          this.loginForm.passwordRegister=md5(this.loginForm.passwordRegister)
        }
        if(this.loginForm.passwordRegister2!=''){
          this.loginForm.passwordRegister2=md5(this.loginForm.passwordRegister2)
        }
        this.$store.dispatch('AC_REGISTER', {
          username: this.loginForm.usernameRegister,
          password: this.loginForm.passwordRegister
        }).then(res => {
          this.$notify({title: '注册成功',message: '',type: 'success'});
          this.$router.push({ path: '/login' })
        }).catch((err) => {
          this.$store.commit('SHOW_ERROR_TOAST', err.body.message || err.body)        
        }).finally(() => {
          this.loading = false
        })
     },
     handleClick(tab, event) {
        Object.assign(this.$data, this.$options.data());//置空data数据
      }

  },
  watch:{
    'loginForm.passwordRegister2':function(newVal){
         if(newVal!=''&&newVal!=this.loginForm.passwordRegister){
           this.show=true;
         }else{
           this.show=false;
         }
      },
    'loginForm.passwordRegister':function(newVal){
        if(this.loginForm.passwordRegister2!=''&&newVal!=this.loginForm.passwordRegister2){
          this.show=true;
        }else{
          this.show=false;
        }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;//-webkit-box-shadow（背景颜色）-webkit表示支持谷歌浏览器，可以不加
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss"  scoped>
/* scoped是有作用域，有时间加上，并依然能达到效果 */
/* 20190626 采用scss里的deep的做法，可以达到覆盖子标签样式的效果*/

.el-tabs {
/deep/ .el-tabs__item{
 color: #acb5cc ;
 
}



}

.el-tabs {
 /deep/ .el-tabs__item.is-active {
    color: #409EFF;
    font-weight:bold;
    font-size:150%;
}

}
.transition-box {
    margin-bottom: 10px;
    width: 100%;
    
    border-radius: 4px;
    background-color: rgb(219, 10, 20);
    text-align: center;
    color: #fff;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
 
</style>