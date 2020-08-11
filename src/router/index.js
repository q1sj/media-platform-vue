import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/cameraList',
        name: 'CameraList',
        component: () => import('../components/CameraList')
    },
    {
        path: '/serviceAreaList',
        name: 'ServiceAreaList',
        component: () => import('../components/ServiceAreaList')
    },
    {
        path: '/hello',
        component: () => import('../components/HelloWorld')
    }
]

const router = new VueRouter({
    routes
})

export default router
