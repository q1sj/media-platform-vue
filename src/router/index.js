import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: '/login',
        component: () => import('../views/Login')
    },
    {
        path: '/home',
        component: () => import('../views/Home'),
        children:[
            {
                path: '/',
                redirect: "/cameraList"
            },
            {
                path: '/cameraList',
                name: 'CameraList',
                component: () => import('../views/CameraList')
            },
            {
                path: '/serviceAreaList',
                name: 'ServiceAreaList',
                component: () => import('../views/ServiceAreaList')
            },
            {
                path: '/userList',
                component:()=>import('../views/UserList')
            }
        ]
    },
    {
        path: '/hello',
        component: () => import('../components/HelloWorld')
    }


]

const router = new VueRouter({
    routes
})


/*router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 从哪个路径跳转而来
    //next 是一个函数，表示放行
    if (to.path == '/login') return next()

    //获取token
    const tokenStr = sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next();
})*/

router.beforeEach((to, from, next) => {
    //从缓存取token
    const isLogin = localStorage.Authorization ? true : false;

    //
    if (to.path == '/login') {
        next()
    } else {
        //判断token是否存在
        if (!isLogin) {
            next('/login')
        }
        /*else {
                next()
            }*/
        }
    next();
});

export default router
