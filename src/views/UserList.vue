<template>
    <div>
        <!--搜索 按钮-->
        <el-button @click="visible=true">添加</el-button>
        <!--表格-->
        <el-table
                :data="tableData.list"
                style="width: 100%" stripe>
            <el-table-column
                    prop="realName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="loginName"
                    label="账号">
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="手机">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    label="状态">
                <template slot-scope="scope">
                    <el-switch
                            @change=""
                            :active-value=1
                            :inactive-value=0
                            :width="54"
                            :active-text="scope.row.status === 1 ? '启用' : '禁用'"
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <!--添加用户-->
        <el-dialog title="用户" :visible.sync="visible" width="30%">
            <el-form label-position="top" label-width="80px" :model="formData" style="width: 350px;">
                <el-form-item label="姓名">
                    <el-input v-model="formData.realName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="formData.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formData.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-button @click="submitForm">提交</el-button>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                name: '',
                page: 0,
                pageSize: 0,
                tableData: {
                    "totalCount": 4,
                    "totalPages": 1,
                    "page": 1,
                    "pageSize": 4,
                    "list": [
                        {
                            "id": 6,
                            "realName": "dq",
                            "loginName": "dunq",
                            "phoneNumber": "15833669696",
                            "email": "8585@qq.com",
                            "status": 0,
                            "createTime": "2020-08-05 16:53:04"
                        },
                        {
                            "id": 5,
                            "realName": "于振华",
                            "loginName": "aaaa",
                            "phoneNumber": "18538201773",
                            "email": "asdas@qq.com",
                            "status": 1,
                            "createTime": "2020-08-03 09:24:46"
                        },
                        {
                            "id": 4,
                            "realName": "test",
                            "loginName": "test",
                            "phoneNumber": "15645219874",
                            "email": "123456@163.com",
                            "status": 1,
                            "createTime": "2020-07-29 19:11:02"
                        },
                        {
                            "id": 3,
                            "realName": "李子晗",
                            "loginName": "lzh",
                            "phoneNumber": "18888888888",
                            "email": "15@qq.com",
                            "status": 1,
                            "createTime": "2020-07-22 19:25:28"
                        }
                    ]
                },
                visible: false,
                formData: {
                    realName: '',
                    loginName: '',
                    phoneNumber: '',
                    email: '',
                    password: ''
                }
            }
        },
        created() {
            this.list()
        },
        methods: {
            list() {
                let name = this.name
                let page = this.page
                let pageSize = this.pageSize
                axios.post('/sys/getUsers', {name, page, pageSize}).then(resp => {
                    // console.log(resp.data)
                    if (resp.data.success) {
                        this.$message.success('刷新成功')
                        this.tableData = resp.data.data
                    } else {
                        this.$message.error(resp.data.msg)
                    }
                })
            },
            submitForm() {
                console.log(this.formData);
                axios.post('/sys/addUser', this.formData).then(resp => {
                    console.log(resp)
                    if (resp.data.success) {
                        this.visible = false
                        this.$message.success('添加成功')
                        this.list()
                    } else {
                        this.$message.error(resp.data.msg)
                    }
                })
            }
        },
        components: {}
    }
</script>

<style lang='scss' scoped>
    /deep/ .el-switch {
        position: relative;
        height: 24px;
        line-height: 24px;

        &.is-checked {
            .el-switch__core {
                background: #179bff;

                &:after {
                    margin-left: -22px;
                }
            }
        }

        .el-switch__label,
        .el-switch__core {
            height: 24px;
        }

        .el-switch__core {
            border-radius: 12px;
            border: none;
            background: #f1f1f1;

            &:after {
                box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
                width: 22px;
                height: 22px;
            }
        }

        .el-switch__label.is-active {
            color: #333;
        }

        .el-switch__label--right {
            margin-left: 0px;

            &.is-active {
                color: #fff;
                right: 24px;
            }

            position: absolute;
            right: 5px;
            top: -1px;
            color: #999;

            > span {
                font-size: 12px;
            }
        }
    }
</style>