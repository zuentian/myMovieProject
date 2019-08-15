<template>
  <el-input class="input-with-select" :placeholder="placeholder" v-model="p_value" @keyup.enter.native="handleChange" @change="handleChange">
    <el-button slot="append" icon="el-icon-search" @click.stop="handleChange"></el-button>
  </el-input>
</template>

<style>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
export default {
  name: 'input-search',
  data() {
    return {
      p_value: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange(newVal) {
      this.$emit('change', newVal)
    }
  },
  watch: {
    p_value(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.p_value = newVal
    }
  }
}
</script>