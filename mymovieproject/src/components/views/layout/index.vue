<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
       <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import Sidebar from '../sidebar'
import Navbar from '../navbar'
import TagsView from '../tags-view'
import AppMain from '../app-main'
export default {
  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
