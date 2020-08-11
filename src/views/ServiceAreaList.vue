<template>
    <div>
        <!--搜索-->
        <div style="float: right">
            <el-input
                    placeholder="服务区名称"
                    v-model="name"
                    clearable
                    style="width: 150px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="list">搜索</el-button>
        </div>
        <!--表格-->
        <el-table
                :data="tableData.list"
                style="width: 100%" stripe>
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="服务区名称">
            </el-table-column>
            <el-table-column
                    prop="interfaceUrl"
                    label="服务区ip">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="page"
                layout="total, prev, pager, next, jumper"
                :page-size="pageSize"
                :total="tableData.total"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "ServiceAreaList",
        created() {
            this.list()
        },
        data() {
            return {
                name: '',
                page: 1,
                pageSize: 15,
                tableData: [
                    /* {
                         "id": 1,
                         "name": "萧山服务区",
                         "interfaceUrl": "http://192.168.1.11"
                     },
                     {
                         "id": 2,
                         "name": "建德服务区",
                         "interfaceUrl": "http://192.168.1.7"
                     }*/
                ]
            }
        },
        methods: {
            list() {
                let name = this.name;
                let page = this.page;
                let pageSize = this.pageSize;
                axios.post('/serviceArea/getServiceAreas', {name, page, pageSize}).then(resp => {
                    console.log(resp)
                    this.tableData = resp.data.data
                })
            },
            handleCurrentChange(page) {
                this.page = page;
                this.list();
            }
        }
    }
</script>

<style scoped>

</style>