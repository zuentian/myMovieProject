<template>
  <div class="app-main" style="min-height: 100%" v-loading="loading">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view class="app-container" :key="$route.path"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'loading'
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
