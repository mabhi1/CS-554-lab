<template>
  <div id="app">
    <div id="navigation">
      <div id="title">Marvel</div>
      <div id="menu">
        <div id="menu_link"><router-link :to="{name: 'home'}">HOME</router-link></div>
        <div id="menu_link"><router-link :to="{name: 'characters', params: {page: 0} }">CHARACTERS</router-link></div>
        <div id="menu_link"><router-link :to="{name: 'comics', params: {page: 0} }">COMICS</router-link></div>
        <div id="menu_link"><router-link :to="{name: 'series', params: {page: 0} }">SERIES</router-link></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navigation{
  box-shadow: 0px 1px 10px -3px black;
  margin-bottom: 20px;
}
#navigation, #navigation a{
  min-height: 30px;
  display: flex;
  padding: 5px;
  background-color: #1976d2;
  color: #fff;
  text-decoration: none;
  line-height: 1.5em;
}
#title{
  width: 60%;
  padding: 10px;
  text-align: left;
  padding-left: 100px;
  font-size: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
}
#menu{
  width: 40%;
  display: flex;
}
#menu_link{
  margin-right: 25px;
  padding-top: 10px;
  font-size: 15px;
  font-weight: 500;
}
</style>
