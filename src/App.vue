<template>
    <div id="app">
        <!--    <CameraList msg="Welcome to Your Vue.js App"/>-->
        <router-link to="/hello">test</router-link>
        |
        <router-link to="/cameraList">camera</router-link>
        |
        <router-link to="/serviceAreaList">service-area</router-link>
        <br><br>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
