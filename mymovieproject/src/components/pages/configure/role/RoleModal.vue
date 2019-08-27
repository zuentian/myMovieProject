<template>
  <modal v-model="show">
    <div slot="modal-header">
      <h4 v-if="id">编辑角色</h4>
      <h4 v-else>新增角色</h4>
      <span class="el-icon-close" title="关闭" @click.stop="cancel()"></span>
    </div>
    <div slot="modal-body">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="名称" prop="roleName">
            <el-input placeholder="请输入名称" v-model="form.roleName"></el-input>
          </el-form-item>

          <el-form-item label="权限" prop="permissionIds"> 
            <!-- <el-select 
              v-model="form.permissionIds"
              multiple
              filterable
              remote
              placeholder="请输入权限"
              :remote-method="search"
              :loading="loading"
              style="width: 100%;">
              <el-option
                v-for="item in permissions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select> -->
          </el-form-item>

          <el-form-item label="状态" prop="status">
              <el-select  filterable remote v-model="form.status"  :loading="statusLoading" style="width: 100%;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>
      </el-form>
    </div>
    <div slot="modal-footer">
      <el-button type="primary" @click="submit()">{{id?"保存":"创建"}}</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
import {Modal} from '@/components/common'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      loading: false,
      permissions: [],
      form: {
        roleName: null,
        status: null,
        permissionIds: []
      },
      statusLoading:false,
      options:null,
      rules: {
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请输入状态", trigger: "blur" }
        ],
        // permissionIds: [
        //   { required: true, message: "请输入权限", trigger: "blur" }
        // ],
      }
    };
  },
  methods: {
    ...mapActions([
      'QueryDictByDictType',
    ]),
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
            resolve(valid)
        });
      });
    },
    async statusSearch(){
        this.statusLoading=true;
        let {list} =await this.QueryDictByDictType({
            dictType:'ROLESTATUS'
        })
        this.options=list;
        this.statusLoading=false;
    },
    // async search(query) {
    //   this.loading = true
    //   let { result, count } = await this.AC_SearchPermission({
    //     name: query
    //   })
    //   this.permissions = result
    //   this.loading = false
    // },
    submit() {
    },
    cancel() {
      this.$emit('update:show',false);
    }
  },
  components: {
    Modal
  },
  created() {
    this.statusSearch();
  }
};
</script>