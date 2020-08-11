<template>
    <el-container>
        <el-header>
            <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" router>
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                    <template slot="title">
                        <span> {{ item.navItem }}</span>
                    </template>
                </el-menu-item>
                <el-link icon="el-icon-user" @click.prevent="logout" style="margin-top:10px;float: right;font-size: medium">退出</el-link>
            </el-menu>
        </el-header>

        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {
                // 导航栏
                navList: [
                    {name: '/cameraList', navItem: '点位列表'},
                    {name: '/serviceAreaList', navItem: '服务区列表'},
                    {name: '/hello', navItem: 'test'}
                ]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {//退出功能
                //弹出确认对话框
                //用户点击确认，跳回用户登录页面，清除token
                this.$confirm('确定要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    //确认退出，清除token
                    localStorage.removeItem('Authorization')
                    localStorage.removeItem('user')
                    //跳转登录页面(编程式导航)
                    this.$router.push('/login')

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>