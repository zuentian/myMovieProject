<template>
    <el-dialog
        :close-on-press-escape="false"
        @open="onDialogOpen"
        @close="onDialogClose"
        class="el-modal_wrapper"
        :lock-scroll="true"
        :modal="!full"
        :width="full?'100%':`${width}px`"
        :style="{'padding-top': full?'85px':'75px', 'padding-left': full?'180px':0}"
        :close-on-click-modal="clickOutClose"
        :visible.sync="p_value"
        :fullscreen="full">
        <div slot="title" class="modal-header">
            <slot name="modal-header"></slot>
        </div>
        <div class="modal-body">
            <slot name="modal-body"></slot>
        </div>
        <div slot="footer" class="modal-footer">
            <slot name="modal-footer"></slot>
        </div>
    </el-dialog>
</template>
<script>
/* eslint-disable */
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 600
        },
        full: {
            type: Boolean,
            default: false
        },
        clickOutClose: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            
            p_value: this.value
        }
    },
    methods: {
        onDialogOpen() {
            this.$emit('open')
        },
        onDialogClose() {
            this.$emit('close')
        }
    },
    watch: {
        value(newValue) {
            this.p_value = newValue
        },
        p_value(newValue) {
            this.$emit('input', newValue)
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixin.scss';

.el-modal_wrapper{
    .el-dialog {
        margin-top: 0 !important;
    }
  .el-dialog__header {
        padding: 0;
  }
  .el-dialog__body {
      padding: 0;
      overflow: auto;
  }
  .el-dialog__footer {
    padding: 0;
    .modal-footer {
        .btn {
            width: 88px
        }
    }
  }
  .el-dialog__close {
      display: none;
  }
}
.modal-header {
    height: 55px;
    line-height: 20px;
    border-bottom: none;
    padding: 0;
    background:#f1f1f1;
    border-radius: 4px;
    text-align: center;
    position: relative;
    @include clearfix();
    div {
      > h4 {
          height: 20px;
          line-height: 20px;
          font-size: 20px;
          margin-top: 19px;
          position: relative;
          display: inline-block;
          font-weight: normal;
          color: #6f7276;
      }
      > h3 {
          font-size: 14px;
          line-height: 42px;
          padding: 0 5px;
          color: #364150;
      }
      > span {
          position: absolute;
          right: 19px;
          top: 19px;
          font-size: 16px;
          cursor: pointer;
          font-weight: bold;
          color: #666;
          &:hover {
              color: #999;
          }
      }
    }
}
.modal-body{
  padding: 20px;
  background: white;
  >header {
      margin: 0;
  }
  .tabs-control{
      padding: 19px 30px 0px 30px;
      border-top: 1px solid $border-grey;
      .tabs {
          margin-bottom: 21px;
          >li {
              font-size: 20px;
              line-height: 20px;
              font-weight: lighter;
              margin: 0px 80px 0px 0px;
              padding: 0px 8px 12px 8px;
              color: #bfbfbf;
              &.active{
                  color: #0093ff;
                  border-bottom: 4px solid #0093ff;
              }
          }
      }
      .table {
          border: 1px solid #e0e0e0;
          background: #FFF;
          > tbody {
              > tr {
                  th{
                      font-size: 16px;
                      padding: 22px;
                      border: 1px solid #e0e0e0;
                  }
                  td {
                      font-size: 14px;
                      padding: 18px;
                  }
              }
          }
      }
  }
}
.modal-footer {
  padding: $modal-inner-padding;
  text-align: right; // right align buttons
  border-top: 1px solid $modal-footer-border-color;
  @include clearfix; // clear it in case folks use .pull-* classes on buttons

  // Properly space out buttons
  .btn + .btn {
    margin-left: 5px;
    margin-bottom: 0; // account for input[type="submit"] which gets the bottom margin like all other inputs
  }
  // but override that for button groups
  .btn-group .btn + .btn {
    margin-left: -1px;
  }
  // and override it for block buttons as well
  .btn-block + .btn-block {
    margin-left: 0;
  }
}

</style>