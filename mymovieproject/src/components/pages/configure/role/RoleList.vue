
<template>
    <div>
        <el-card>
            <div slot="header" style="display:flex;justify-content: space-between;align-items: center;">
                <label style="font-size: 16px;">{{title}}列表</label>
                <el-button type="text" @click="showCreate=true">新增{{title}}<i class="el-icon-plus" style="margin-left:10px;"></i></el-button>
            </div>
            <el-form class="filter-container">
                <el-select @change="fetchData" clearable  filterable  remote :loading="dictStatusLoading" style="margin:0 30px;" v-model="filter.status" :placeholder="`${title}状态`">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <input-search style="max-width: 310px;" :placeholder="`请输入${title}名称`" v-model="filter.roleName" @change="handleFilter"></input-search>
            </el-form>
            <el-table style="width: 100%"  :data="list" element-loading-text="加载中" :empty-text="`暂无${title}数据`" border fit highlight-current-row>
                <el-table-column show-overflow-tooltip v-for="(item, index) in tables" align="center" :key="index" :prop="item.name" :label="item.showName" :width="item.width > 0 ? item.width : null">
                    <template slot-scope="scope">
                    <span v-if="item.name=='status'">{{scope.row[item.name]| listFormatMap(options)}}</span>
                    <span v-else>{{scope.row[item.name]}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-button type="primary" size="small">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{operate: 'modify', row: scope.row}">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{operate: 'delete', row: scope.row}">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-button type="primary" size="small">
                        <span class="el-dropdown-link">
                            变更<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        </el-button>
                        <el-dropdown-menu slot="dropdown"  >
                                <el-dropdown-item :command="{operate: 'changeStatus', row: scope.row,options:optionsFilt(scope.row.status)[index]}"  
                                v-for="(item,index) in optionsFilt(scope.row.status)" :key="index">{{item.label}}</el-dropdown-item>
                                <!--v-for 比v-if优先级高，但是不建议两个同时使用，vscode编辑器会报错，虽然并不影响效果-->
                        </el-dropdown-menu>
                    </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10,20,30,50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
                </el-pagination>
            </div>

            <role-create v-if="showCreate" :show.sync="showCreate" @success="fetchData"></role-create>
            <role-modify v-if="showModify" :show.sync="showModify" :roleId.sync="roleId" @success="fetchData"></role-modify>

        </el-card>

    </div>
</template>

<script>

import { default as tables } from './tables'
import { mapActions } from 'vuex'
import { InputSearch } from '../../../common'
import RoleCreate from './RoleCreate.vue'
import RoleModify from './RoleModify.vue'
export default {
    data(){
        return{
            list:null,
            tables,
            page:{
                pageNum:1,
                pageSize:10,
            },
            count:0,
            dictStatusLoading:false,
            options:null,
            filter:{
                status:"",
                roleName:"",
            },
            roleId:"",
            showCreate:false,
            showModify:false,
        }
    },
    computed: {
        title() {
            return this.$route.meta.title.replace('管理', '')
        }
    },
    methods:{
        ...mapActions([
            'QueryRole',
            'QueryDictByDictType',
        ]),
        async fetchData(){
            await this.$store.dispatch("QueryRole",{
                ...this.page,
                ...this.filter,
            }).then(res=>{
                this.list = res.list
                this.count = res.count
            }).catch(err=>{
            })
        },
        handleSizeChange(val){
            this.page.pageSize = val
            this.fetchData()
        },
        handleCurrentChange(){
            this.page.pageNum = val
            this.fetchData()
        },
        handleFilter(){
            this.page.pageNum = 1
            this.fetchData()
        },
        async roleStatus(){
            this.dictStatusLoading=true;
            let {list} =await this.QueryDictByDictType({
                dictType:'ROLESTATUS'
            })
            this.options=list;
            this.dictStatusLoading=false;
        },
        handleCommand({operate, row,options}) {
             switch(operate){
                 case 'modify':
                     this.roleId = row.roleId
                     this.showModify = true
                     break;
                 case 'delete' :
                     this.$store.dispatch("DeleteUserByUserId",{
                        roleId:row.roleId
                     }).then((res)=>{
                         this.fetchData();
                         this.$notify({title: '删除成功',message: '',type: 'success'});
                     }).catch(err=>{
                         this.$store.commit('SHOW_ERROR_TOAST', err.data.message || err.data);
                     })
                     break;
                 case 'changeStatus':
                     this.$store.dispatch("UpdateUserToStatusByUserId",{
                         roleId:row.roleId,
                         status:options.value,
                     }).then((res)=>{
                         this.fetchData();
                         this.$notify({title: '变更'+options.label+'成功',message: '',type: 'success'});
                     }).catch(err=>{
                         this.$store.commit('SHOW_ERROR_TOAST', err.data.message || err.data);
                     })
                     break;
             }
        },
        optionsFilt(value){
            
            let optionfilt=this.options;
            return optionfilt.filter(function (optionfilt) {
                
            return optionfilt.value!=value;
        })
        }
    },
    created(){
        this.roleStatus();
        this.fetchData();
    },
    components:{
        InputSearch,
        RoleCreate,
        RoleModify,
    }
}
</script>

<style>

</style>
