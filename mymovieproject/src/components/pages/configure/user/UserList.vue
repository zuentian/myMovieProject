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
            <input-search style="max-width: 310px;" :placeholder="`请输入${title}名称`" v-model="filter.nameOrMobile" @change="handleFilter"></input-search>
        </el-form>
        <el-table style="width: 100%"  :data="list" element-loading-text="加载中" :empty-text="`暂无${title}数据`" border fit highlight-current-row>
            <el-table-column show-overflow-tooltip v-for="(item, index) in tables" align="center" :key="index" :prop="item.name" :label="item.showName" :width="item.width > 0 ? item.width : null">
                <template slot-scope="scope">
                <span v-if="item.type=='date'">{{scope.row[item.name] }}</span>
                <span style="text-align: left;" v-else-if="item.type=='html'" v-html="scope.row[item.name]"></span>
                <span v-else-if="item.name=='status'">{{scope.row[item.name] | listFormatMap(options)}}</span>
                <span v-else>{{scope.row[item.name]}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary" size="small">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{operate: 'modify', row: scope.row}">编辑</el-dropdown-item>
<!-- 
                    <el-dropdown-item :command="{operate: 'update', row: scope.row}">{{scope.row.status==0?'禁用':'启用'}}</el-dropdown-item>
                     -->
                    </el-dropdown-menu>
                </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10,20,30,50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
            </el-pagination>
        </div>
    </el-card>
    <user-create v-if="showCreate" :show.sync="showCreate" @success="fetchData"></user-create>
    <user-modify v-if="showModify" :show.sync="showModify" :id.sync="id" @success="fetchData"></user-modify>
</div>
</template>
<script>
import { default as tables } from './tables'
import { mapActions } from 'vuex'
import { InputSearch } from '../../../common'
import UserCreate from './UserCreate.vue'
//import UserModify from './UserModify.vue'
export default {
    data(){
        return {
             id: 0,
             tables,
             list: [],
             page: {
                 pageNum: 1,
                 pageSize: 20
             },
             count: null,
             filter: {
                 status: "",
                 nameOrMobile: ""
             },
             showCreate: false,
             showModify: false,
             options:null,
             dictStatusLoading:false,

        }
    },
    computed: {
        title() {
            return this.$route.meta.title.replace('管理', '')
        }
    },
    methods: {
         ...mapActions([
             'AC_SearchUser',
             'QueryDictByDictType'
         ]),
         async fetchData(){
              let {count, list} = await this.AC_SearchUser({
                  ...this.page,
                  ...this.filter
              })
              this.list = list
              this.count = count
         },
         handleCurrentChange(val) {
             this.page.pageNum = val
             this.fetchData()
         },
         handleSizeChange(val) {
             this.page.pageSize = val
             this.fetchData()
         },
         handleFilter() {
             this.page.pageNum = 1
             this.fetchData()
         },
         handleCommand({operate, row}) {
             switch(operate){
                 case 'modify':
                     this.id = row.id
                     this.showModify = true
                     break;
                 case 'update':
                     this.AC_UpdateUser({
                         id: row.id,
                         //status: row['status'] == "0"? "1": "0"
                     }).then(this.fetchData)
                     break;
             }
         },
         async queryDictStatusMethod(){
             this.dictStatusLoading=true;
             let {list} =await this.QueryDictByDictType({
                 dictType:'USERSTATUS'
              })
              this.options=list;
              this.dictStatusLoading=false;
         }
    },
    created(){
        this.queryDictStatusMethod();
        this.fetchData();
        
    },
    components: {
        InputSearch,
        UserCreate,
        // UserModify
    }
}
</script>