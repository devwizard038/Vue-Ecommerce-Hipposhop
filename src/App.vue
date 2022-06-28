<template>
  <!-- Shopping Cart -->
  <div v-if="this.showCart === true">
    <ShoppingCart @closeCart="closeCart"/>
  </div>
  <div v-if="this.showLogin === true">
    <LoginModalComp @closeLogin="closeLogin"/>
  </div>
  <div class="appContainer">
    <nav class="navbar">
      <div class="brand-title">ShopCart.io</div>
      <div class="toggle-button" @click="toggleMobile">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div
        :class="{active: this.active}"
        class="navbar-links"
      >
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="this.getAdmin">
            <router-link to="/admin">AdminPage</router-link>
          </li>
          <li class="loginIcon">
            <a @click="openLogin"
               v-if="this.getUser === null"
            >👤</a>
            <a
              v-else
              @click="openLogin"
            >{{ this.getUser }}</a>
          </li>

          <li><a @click="openCart">&#x1F6D2;({{ this.cartItems }})</a></li>
        </ul>
      </div>
    </nav>
    <transition
      mode="in-out"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <p
        class="popup"
        v-if="this.selected != null"
      ><b>Ati adaugat in cos:</b>
        {{ this.selected.quantity }}/{{ this.selected.unit }} de "{{ this.selected.title }}"
      </p>
    </transition>
    <router-view/>
  </div>

</template>

<script>
import ShoppingCart from "@/components/ShoppingCartComp.vue";
import LoginModalComp from "@/components/LoginModalComp"
import {mapActions, mapGetters} from "vuex";


export default {
  name: 'App',
  components: {
    ShoppingCart,
    LoginModalComp
  },
  data() {
    return {
      showCart: false,
      selected: null,
      active: false,
      showLogin: false,
    }
  },
  computed: {
    ...mapGetters({
      getCartCount: "cart/getCartCount",
      getSelected: "cart/getSelected",
      getUser: "user/getUser",
      getAdmin:"user/getAdmin"
    }),
    /**
     * Display count of products in the cart
     */
    cartItems() {
      this.loadCart()
      return this.getCartCount
    },
    selectedCart() {
      return this.getSelected
    }
  },
  watch: {
    selectedCart(nv) {
      if (nv != null) {
        this.selected = nv
      }
      setTimeout(() => {
        this.loadSelected(null)
        this.selected = null
      }, 3000)
    }
  },
  mounted() {
    this.loadCart()
    this.loadUserLocal();
  },
  methods: {
    ...mapActions({
      loadCart: "cart/loadCart",
      loadSelected: "cart/loadSelected",
      loadUserLocal:"user/loadUserLocal"
    }),
    closeCart() {
      this.showCart = false;
    },
    closeLogin(){
      this.showLogin = false;
    },
    openCart() {
      this.showCart = true;
    },
    openLogin(){
      this.showLogin = true;
    },
    toggleMobile() {
      this.active = !this.active
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html, body {
  margin: 0;
  height: 100%;
  width: 100%;
}
.popup {
  position: absolute;
  top: 4rem;
  right: 0;
  background-color: rgba(23, 59, 133, 0.8);
  color: #f8f8f8;
  padding: 0.5rem;
  border-radius: 0.7rem;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  z-index: 10000000;
}

.appContainer {
  font-family: 'Poppins', sans-serif;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template:
    "header" 9%
    "content" 91%
    / 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
  color: white;
  height: 100%;
  grid-area: header;
}

.brand-title {
  font-size: 2.5rem;
  margin: .5rem;
}

.navbar-links ul {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar-links li {
  height: 100%;
  list-style: none;
}

.navbar-links li a {
  height: 100%;
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
  padding: 1.4rem;
  display: block;
  cursor: pointer;
}

.navbar-links li:hover {
  background-color: #555;
}

.toggle-button {
  position: absolute;
  top: .75rem;
  right: 1rem;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  margin-top: 0.6rem;
}

.toggle-button .bar {
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .toggle-button {
    display: flex;
  }

  .navbar-links {
    display: none;
    width: 100%;
  }

  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links ul {
    width: 100%;
    flex-direction: column;
  }

  .navbar-links li {
    text-align: center;
  }

  .navbar-links li a {
    padding: .5rem 1rem;
  }

  .active {
    display: flex;
  }
}
</style>
