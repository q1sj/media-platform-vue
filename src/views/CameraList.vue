<template>
    <div>
        <!--搜索-->
        <div style="float: right">
            <el-select v-model="serviceId" filterable placeholder="请选择服务区" clearable style="width: 150px">
                <el-option
                        v-for="item in serviceAreaList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input
                    placeholder="点位名称"
                    v-model="name"
                    clearable
                    style="width: 150px">
            </el-input>
            <el-select v-model="direction" placeholder="方向" style="width: 100px" clearable>
                <el-option
                        v-for="item in directionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="status" placeholder="推流状态" style="width: 120px" clearable>
                <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="isShow" placeholder="省级平台是否展示" style="width: 180px" clearable>
                <el-option
                        v-for="item in isShowList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <!--表格-->
        <el-table
                :data="tableData.list"
                style="width: 100%" stripe>
            <el-table-column
                    prop="serviceName"
                    label="服务区名">
            </el-table-column>
            <el-table-column
                    prop="directionName"
                    label="方向">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="点位名称">
            </el-table-column>
            <el-table-column
                    prop="manufacturer"
                    label="厂家">
            </el-table-column>
            <el-table-column
                    prop="model"
                    label="型号">
            </el-table-column>
            <el-table-column
                    prop="style"
                    label="样式">
            </el-table-column>
            <el-table-column
                    prop="ip"
                    label="IP">
            </el-table-column>
            <el-table-column
                    prop="port"
                    label="端口">
            </el-table-column>
            <el-table-column
                    prop="rtsp"
                    label="RTSP">
            </el-table-column>
            <el-table-column
                    label="推流状态">
                <template slot-scope="scope">
                    <el-switch
                            @change="push(scope.row)"
                            v-model="scope.row.status"
                            :width="54"
                            :active-text="scope.row.status === true ? '开启' : '关闭'"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="省级平台是否展示">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isShow"
                            :width="54"
                            :active-text="scope.row.isShow === true ? '展示' : '隐藏'"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
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
        data() {
            return {
                page: 1,
                pageSize: 15,
                name: '',
                // 服务区搜索条件
                serviceId: '',
                serviceAreaList: [],
                // 方向
                direction: '',
                directionList: [
                    {
                        "label": "上行",
                        "value": "up"
                    },
                    {
                        "label": "下行",
                        "value": "down"
                    }
                ],
                // 推流状态
                status: '',
                statusList: [
                    {
                        "label": "推流中",
                        "value": true
                    },
                    {
                        "label": "未推流",
                        "value": false
                    }
                ],
                // 是否展示
                isShow: '',
                isShowList: [
                    {
                        "label": "展示",
                        "value": true
                    },
                    {
                        "label": "不展示",
                        "value": false
                    }
                ],
                tableData: []
            }
        },
        created() {
            //获取点位列表
            this.search();
            this.getServiceAreaList();
        },
        methods: {
            // 推流
            push(row) {
                if (row.status) {
                    this.start(row.serviceId, row.id)
                } else {
                    this.stop(row.serviceId, row.id)
                }
            },
            // 开始推流
            start(serviceId, cameraId) {
                axios.post('/camera/startPush',
                    {
                        "serviceId": serviceId,
                        "cameraId": cameraId
                    }).then(resp => {
                    if (resp.data.success) {
                        this.search();
                        this.$message.success('开始推流');
                    } else {
                        this.search();
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            // 结束推流
            stop(serviceId, cameraId) {
                axios.post('/camera/stopPush',
                    {
                        "serviceId": serviceId,
                        "cameraId": cameraId
                    }).then(resp => {
                    if (resp.data.success) {
                        this.search();
                        this.$message.success('结束推流');
                    } else {
                        this.search();
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            // 搜索
            search() {
                let name = this.name
                let direction = this.direction
                let status = this.status
                let isShow = this.isShow
                let page = this.page
                let pageSize = this.pageSize
                let serviceId = this.serviceId
                axios.post('/camera/getCameras', {
                    serviceId, name, direction, status, isShow, page, pageSize
                }).then(resp => {
                    this.tableData = resp.data.data
                    if (resp.data.success) {
                        this.$message.success('刷新列表');
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            getServiceAreaList() {
                axios.post('/serviceArea/getServiceAreas', {page: 0, pageSize: 0}).then(resp => {
                    // console.log(resp)
                    this.serviceAreaList = resp.data.data.list;
                })
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage;
                this.search();
            }

        }
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