<template>
    <modal v-model="show">
        <div slot="modal-header">
            <h4 v-if="id">编辑用户</h4>
            <h4 v-else>新增</h4>
            <span class="el-icon-close" title="关闭" @click.stop="cancel()"></span>
        </div>
    <div slot="modal-body">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="登录账号" prop="userCode">
          <el-input v-model="form.userCode"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户称号" prop="userNameBak">
          <el-input v-model="form.userNameBak"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="permissionIds"> 
          <!-- <el-select 
            v-model="form.roleIds"
            multiple
            filterable
            remote
            placeholder="请输入角色"
            :remote-method="search"
            :loading="loading"
            style="width: 100%;">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select  filterable remote v-model="form.status"  :loading="statusLoading" style="width: 100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
        </el-form-item>
      </el-form>
      
        <div slot="modal-footer">
            <el-button type="primary" @click="submit()">{{id?"保存":"创建"}}</el-button>
            <el-button @click="cancel()">取消</el-button>
        </div>

    </div>
        
    </modal>
</template>
<script>
import {mapActions} from 'vuex'
import {Modal} from '@/components/common'

export default {
    props:{
        show:{
            type:Boolean,
            default:false,
        },
        id:{
            type:Number,
            default:0,
            //twoWay:true
        }
    },
    data(){
        return{
           form:{
               userCode:"",
               userName:"",
               userNameBak:"",
               mobile:"",
               password:"",
               roleIds:[],
               status:"",
               
           },
           options:null,
           statusLoading:false,
           rules:{
                userCode:[
                   {required:true,message:"请输入登录账号",trigger:"blur"},
                   {min: 3, max: 5, message: "长度在 1 到 50 个字符", trigger: "blur" }
                ],
                userName:[
                   {required:true,message:"请输入用户昵称",trigger:"blur"}
                ],
                mobile:[{required:true,message:"请输入手机号",trigger:"blur"}],
                password: [
                    { required: true, message: "请输入用户密码", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "请选择用户状态", trigger: "blur" }
                ]
           }
        }
        
    },
    methods:{
        cancel(){
            //此处改变子组件里的show值，同时改变父组件的值。
            //这个系统有个twowWay方法，可以实现这个功能,但目前不太了解这个功能有什么特别的好处
            this.$emit('update:show',false);
            
        },
        validate() {//检验表单数据是否合法
            return new Promise(resolve => {
                this.$refs.form.validate(valid => {
                    resolve(valid)
                });
            });
        },
        submit(){
          
        },
        async statusSearch(){
            this.statusLoading=true;
            let {list} =await this.QueryDictByDictType({
                dictType:'USERSTATUS'
            })
            this.options=list;
            this.statusLoading=false;
        },
        ...mapActions([
            'QueryDictByDictType'
        ]),
    },
    created(){
      this.statusSearch();
    },
    components:{
        Modal,
    }
}
</script>
<style scoped>

</style>