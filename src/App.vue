<template>

  <div id="app">
    <div id="nav">
      <p class="logo">Shop Cart</p>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/admin">AdminPage</router-link>
    </div>
    <router-view />
  </div>

</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.link {
  padding-left: 30px;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  right: 100%;
  color: white;
}

.link:hover {
  color: #fc5000;
}

.link:active {
  color: #fc5000;
}

#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: rgb(7, 7, 7)
}

.logo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fc5000;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: underline;
  padding-right: 10rem;
  opacity: 80%;
}
</style>
