<template>
  <div v-if="this.showCart === true">
    <ShoppingCart @closeCart="closeCart" />
  </div>
  <div id="app">
    <div id="nav">
      <p class="logo">Shop Cart</p>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/admin">AdminPage</router-link>
      <p class="cart" @click="openCart">&#x1F6D2;</p>
      <p style="color: #fc5000">({{ this.cartItems }})</p>
    </div>
    <router-view />
  </div>

</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: { ShoppingCart },
  data() {
    return {
      showCart: false,
    }
  },
  computed: {
    ...mapGetters({
      getCart: "cart/getCart",
      getCartCount: "cart/getCartCount"
    }),
    /*
    * Display count of products in the cart
    * */
    cartItems(){
      this.loadCart()
      return this.getCartCount
    }
  },
  mounted() {
    this.loadCart()
  },
  methods: {
    ...mapActions({
      loadCart: "cart/loadCart"
    }),
    closeCart() {
      this.showCart = false;
    },
    openCart() {
      this.showCart = true;
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.cart {
  margin-left: 30px;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  right: 100%;
  color: white;
  cursor: pointer;
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
