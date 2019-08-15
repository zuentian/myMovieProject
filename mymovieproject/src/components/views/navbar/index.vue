<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

       <el-tooltip effect="dark" content="navbar.screenfull" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> 
<!-- 
      <el-tooltip effect="dark" content="navbar.theme" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>  -->

      <el-dropdown class="avatar-container right-menu-item">
        <div v-if="userInfo" class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="userInfo.avatar | compressImage(80,80)"> -->
          <img class="user-avatar" :src="userInfo.userNameBak">
          <span>{{userInfo.userId}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { Breadcrumb, Hamburger, ErrorLog, Screenfull, ThemePicker } from '../../common'
export default {
  name: 'navbar',
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,//全屏模式
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('AC_LOGOUT').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  },
  mounted(){
    console.log("退出页面*******",this.userInfo);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .el-icon-arrow-down {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
