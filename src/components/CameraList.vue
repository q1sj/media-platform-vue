<template>
    <div>
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
        <el-button type="primary" icon="el-icon-search" @click="search(name,direction,status,isShow)">搜索</el-button>
        <!--表格-->
        <el-table
                :data="tableData"
                style="width: 100%" stripe>
            <el-table-column
                    prop="serviceName"
                    label="服务区名">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="点位名称">
            </el-table-column>
            <el-table-column
                    prop="directionName"
                    label="方向">
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
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <!--<el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="start(scope.row.serviceId,scope.row.id)">开启
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="stop(scope.row.serviceId,scope.row.id)">停止
                    </el-button>
                </template>
            </el-table-column>-->
        </el-table>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                name: '',
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
                tableData: [
                    /*{
                        "id": 1,
                        "serviceId": 1222,
                        "name": "本地点位1",
                        "direction": "up",
                        "manufacturer": "海康",
                        "model": "ddl",
                        "style": "聚焦",
                        "ip": "192.168.1.11",
                        "port": "80",
                        "rtsp": "rtsp://192.168.1.11",
                        "status": true,
                        "isShow": false,
                        "cameraId": 321,
                        "serviceName": "萧山服务区",
                        "directionName": "上行(北区)"
                    },
                    {
                        "id": 2,
                        "serviceId": 21,
                        "name": "本地点位2",
                        "direction": "down",
                        "manufacturer": "海康",
                        "model": "ddl",
                        "style": "聚焦",
                        "ip": "192.168.1.12",
                        "port": "80",
                        "rtsp": "rtsp://192.168.1.12",
                        "status": false,
                        "isShow": false,
                        "cameraId": 12,
                        "serviceName": "萧山服务区",
                        "directionName": "下行(南区)"
                    }*/
                ]
            }
        },
        created() {
            //获取点位列表
            this.search(this.name, this.direction, this.status, this.isShow);
        },
        methods: {
            // 推流
            push(row){
                if (row.status){
                    this.start(row.serviceId,row.id)
                }else {
                    this.stop(row.serviceId,row.id)
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
                        this.search(this.name, this.direction, this.status, this.isShow);
                        this.$message.success(resp.data.msg);
                    } else {
                        this.search(this.name, this.direction, this.status, this.isShow);
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
                        // this.list();
                        this.search(this.name, this.direction, this.status, this.isShow);
                        this.$message.success(resp.data.msg);
                    } else {
                        this.search(this.name, this.direction, this.status, this.isShow);
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            // 搜索
            search(name, direction, status, isShow) {
                axios.post('/camera/getCameras', {
                    name, direction, status, isShow
                }).then(resp => {
                    this.tableData = resp.data.data
                    /*if (resp.data.success) {
                        this.$message.success(resp.data.msg);
                    } else {
                        this.$message.error(resp.data.msg);
                    }*/
                })
            }
        }
    }
</script>