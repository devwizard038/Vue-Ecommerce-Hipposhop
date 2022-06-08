<template>
  <transition
  mode="in-out"
  enter-active-class="animate__animated animate__fadeInRight"
  leave-active-class="animate__animated animate__fadeOutRight"
  >
    <div v-if="this.showCart === true">
      <ShoppingCart @closeCart="closeCart"/>
    </div>
  </transition>
  <div id="app">
    <div id="nav">
      <p class="logo">Shop Cart</p>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/admin">AdminPage</router-link>
      <p class="cart" @click="openCart">&#x1F6D2;</p>
      <p style="color: #fc5000">({{ this.cartItems }})</p>
      <!-- Item added to CART POP-UP  -->
      <transition
          mode="in-out"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
      >
        <p class="popup" v-if="this.selected != null"><b>Ati adaugat in cos:</b>
          {{ this.selected.quantity }}/{{ this.selected.unit }} de "{{ this.selected.title }}"</p>
      </transition>
    </div>
    <router-view/>
  </div>

</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import {mapActions, mapGetters} from "vuex";


export default {
  components: {ShoppingCart},
  data() {
    return {
      showCart: false,
      selected: null,
    }
  },
  computed: {
    ...mapGetters({
      getCartCount: "cart/getCartCount",
      getSelected: "selectedcateg/getSelected"
    }),
    /*
    * Display count of products in the cart
    * */
    cartItems() {
      this.loadCart()
      return this.getCartCount
    },
    selectedCart() {
      return this.getSelected
    }
  },
  mounted() {
    this.loadCart()
  },
  watch: {
    selectedCart(nv) {
      if (nv != null) {
        console.log(nv)
        this.selected = nv
      }
      setTimeout(() => {
        this.loadSelected(null)
        this.selected = null
      }, 3000)
    }
  },
  methods: {
    ...mapActions({
      loadCart: "cart/loadCart",
      loadSelected: "selectedcateg/loadSelected",
    }),
    closeCart() {
      this.showCart = false;
    },
    openCart() {
      this.showCart = true;
    }
  },
}
</script>

<style scoped>
.popup {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fc5000;
  top: 10rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

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
