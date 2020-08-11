<template>
    <el-table
            :data="tableData"
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
</template>

<script>
    export default {
        name: "ServiceAreaList",
        created() {
            axios.post('/serviceArea/getServiceAreas').then(resp=>{
                console.log(resp)
                this.tableData=resp.data.data
            })
        },
        data() {
            return {
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
        }
    }
</script>

<style scoped>

</style>