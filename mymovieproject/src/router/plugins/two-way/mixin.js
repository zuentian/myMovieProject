/**
 * twoWay可以在子组件里改变父组件里的值吗，但是吧这个方法有点问题，目前不采用
 */
export default {
  data() {
    return this.getTwoWayProps().reduce((ret, key) => {
      ret[`p_${key}`] = this.$props[key]
      return ret
    }, {})
  },
  methods: {
    getTwoWayProps() {
      return Object.keys(this.$options.props || {}).filter(key => {
        return this.$options.props[key] && this.$options.props[key].twoWay
      })
    },
    handleChanged(key, val) {
      this[`p_${key}`] = val
    }
  },
  created() {
    this.getTwoWayProps().forEach(key => {
      this.$watch(key, val => this.handleChanged(key, val))
      this.$watch(`p_${key}`, val => this.$emit(`update:${key}`, val))
    })
  }
}
