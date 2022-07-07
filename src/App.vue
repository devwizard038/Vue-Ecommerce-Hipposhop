<template>
  <!-- Shopping Cart -->
  <div v-if="this.showCart === true">
    <ShoppingCart @closeCart="closeCart"/>
  </div>
  <div v-if="this.showLogin === true">
    <LoginModalComp @closeLogin="closeLogin"/>
  </div>
  <div v-if="this.showRegister === true">
    <RegisterModalComp @closeRegister="closeRegister"/>
  </div>
  <div v-if="this.showProfile === true">
    <ProfileComp @closeProfile="closeProfile"/>
  </div>
  <div class="appContainer">
    <nav class="navbar">
      <div class="brand-title">Cegedim Shopping Center</div>
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
            <router-link to="/">Accueil</router-link>
          </li>
          <li v-if="this.getAdmin">
            <router-link to="/admin">Administration</router-link>
          </li>
          <li>
            <a>Mon compte</a>
            <div class="userToolTip">
              <p>{{ this.getUser ? this.getUser : 'Vous devez authentifier pour accéder votre compte ' }}</p>
              <div class="userToolButtons" v-if="this.getUser === null">
                <button class="addToCart" @click="openLogin">Se connecter</button>
                <button class="signUp" @click="openRegister">Créer un compte</button>
              </div>
              <div class="userToolButtons" v-else>
                <button class="logOut" @click="submitLogout">Se déconnecter</button>
                <button class="signUp" @click="openProfile">Détails du profil</button>
              </div>

            </div>
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
        v-if="this.messageUpdate"
      >{{ this.getMessage }}
      </p>
    </transition>
    <transition
      mode="in-out"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <p
        class="popup"
        v-if="this.selected != null"
      ><b>Vous avez ajouté au panier:</b>
        {{ this.selected.quantity }}/{{ this.selected.unit }} de "{{ this.selected.title }}"
      </p>
    </transition>
    <router-view/>
  </div>

</template>

<script>
import ShoppingCart from "@/components/ShoppingCartComp.vue";
import LoginModalComp from "@/components/LoginModalComp";
import RegisterModalComp from "@/components/RegisterModalComp";
import ProfileComp from "@/components/ProfileModalComp";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    ShoppingCart,
    LoginModalComp,
    RegisterModalComp,
    ProfileComp,
  },
  data() {
    return {
      showCart: false,
      selected: null,
      active: false,
      showLogin: false,
      showRegister: false,
      showProfile: false,
      messageUpdate: false,
    }
  },
  computed: {
    ...mapGetters({
      getCartCount: "cart/getCartCount",
      getSelected: "cart/getSelected",
      getUser: "user/getUser",
      getAdmin: "user/getAdmin",
      getMessage: "message/getMessage"
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
    getMessage(){
      this.messageUpdate = true;
      setTimeout(() => {
        this.messageUpdate = false
      }, 3000)
    },
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
      loadUserLocal: "user/loadUserLocal",
      loadAdmin:"user/loadAdmin",
      deleteUserLocal:"user/deleteUserLocal",
      loadUser:"user/loadUser",
      loadLogoutMessage: "message/loadLogoutMessage",
    }),
    closeCart() {
      this.showCart = false;
    },
    closeLogin() {
      this.showLogin = false;
    },
    closeRegister() {
      this.showRegister = false;
    },
    openCart() {
      this.showCart = true;
    },
    openLogin() {
      this.showLogin = true;
    },
    openRegister() {
      this.showRegister = true;
    },
    toggleMobile() {
      this.active = !this.active
    },
    submitLogout() {
      this.loadUser(null);
      this.loadAdmin(false);
      this.deleteUserLocal();
      this.loadLogoutMessage();
    },
    openProfile() {
      this.showProfile = true;
    },
    closeProfile() {
      this.showProfile = false;
    }
  },
}
</script>

<style>
@import "./assets/css/fontPoppins.css";

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
  font-size: 24px;
  margin-left: 20px;
}

.navbar-links {
	height: 100%;
}

.navbar-links ul {
  margin: 0;
  padding: 0;
  display: flex;
	height: 100%;
	align-items: stretch;
}

.navbar-links li {
  list-style: none;
	vertical-align: center;
}

.navbar-links li a {
  text-decoration: none;
  color: white;
  padding: 22px;
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

.userToolTip {
  min-width: 250px;
  visibility: hidden;
  position: absolute;
  z-index: 10000;
  width: auto;
  color: black;
  background-color: #dedede;
  border-radius: 6px;
  padding: 0.8rem;
  right: 3.5rem;
  margin-top: -10px;
  box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.40);
}

.userToolTip p {
  text-align: center;
  padding: 0;
  margin: 0;
}

.navbar-links li:hover .userToolTip {
  visibility: visible;
}

.userToolTip .userToolButtons {
  padding-top: 1.2rem;
  display: flex;
  justify-content: space-between;
}

.userToolTip .userToolButtons .signUp {
  color: rgb(16, 191, 255);
  cursor: pointer;
}

.userToolTip .userToolButtons .signUp:hover {
  text-decoration: underline;

}

.logOut {
  background-color: rgb(162, 7, 7);
  padding: 0.4rem;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
  /*font-weight: bold;*/
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.addToCart:hover {
  background-color: rgb(190, 20, 20);
  cursor: pointer;
}

.addToCart {
  background-color: rgb(16, 191, 255);
  padding: 0.4rem;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
  /*font-weight: bold;*/
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.addToCart:hover {
  background-color: rgb(7, 72, 96);
  cursor: pointer;
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
