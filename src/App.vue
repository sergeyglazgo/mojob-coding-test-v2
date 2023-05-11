<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <div id="header">
      <img id="logo" alt="Vue logo" src="./assets/mojob_logo_on_white.png" />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Muli, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  max-width: 80%;
  margin: auto;
}
#logo {
  position: relative;
  z-index: -1;
  width: 150px;
  height: 150px;
  margin-right: auto;
}
#nav {
  margin-right: auto;
  transform: translateX(-50%);
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #4f4f4f;
}
#nav a.router-link-exact-active {
  color: #46bbb3;
}
</style>
