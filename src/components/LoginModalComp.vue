<template>
  <div class="login-container">
    <div class="loginComponent">
      <div class="headerLogin">
        <button @click="closeLogin()">X</button>
        <h1 v-if="this.getUser === '' ">Login</h1>
      </div>
      <div class="contentLogin" v-if="this.getUser === '' ">
        <label for="user">User</label><br/>
        <input
          :class='["inputComponent",checkEmail(email)]'
          id="emailInput"
          type="email"
          name="user"
          minlength=4
          placeholder="Enter email..."
          v-model="email"
          required
        /><br/>
        <label for="password">Password</label><br/>
        <p class="passwordReq">
          <span
            style="color:green"
            v-if="checkPassword(password) === 'valid'"
          >
            &#10004;
          </span>
          <span
            style="color: red"
            v-else
          >
            &#10006;
          </span>
          Minimum eight characters, at least one letter and one number
        </p>
        <input
          :class='["inputComponent",checkPassword(password)]'
          type="password"
          name="password"
          minlength=6
          placeholder="Enter password..."
          v-model="password"
          required
        /><br/>
        <button
          :class="[checkPassword(password) === 'valid' && checkEmail(email) === 'valid' ? 'btnLogin' : 'btnLoginInactive']"
          type="submit"
          @click="submitLogin()"
        >Login
        </button>
      </div>
      <div class="contentLogin" v-else>
        <h1> {{ this.getUser }} </h1>
        <button
          class="logOut"
          type="submit"
          @click="submitLogout()"
        >Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import validatorEmail from "@/Libraries/validatorEmail";
import validatorPassword from "@/Libraries/validatorPassword";
import EventService from "@/services/EvenService"
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'LoginModalComp',
  emits: {
    // null -> No validation needed
    closeLogin: null,
  },
  data() {
    return {
      email: '',
      password: '',
      validEmail: false,
      validPass: false,
      login: false,
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    })
  },
  methods: {
    ...mapActions({
      loadUser: "user/loadUser",
      loadAdmin: "user/loadAdmin",
    }),
    closeLogin() {
      this.$emit('closeLogin');
    },
    submitLogin() {
      EventService.getUserList().then(
        response => {
          response.data.results.forEach(item => {
            if (item.email === this.email) {
              if (item.password === this.password) {
                this.loadUser(this.email);
                if (item.admin) {
                  this.loadAdmin(true);
                }
              }
            }
          })
        }
      )
        .catch(err => console.log(err));
    },
    submitLogout() {
      this.loadUser('');
      this.loadAdmin(false);
    },
    /**
     * Checks email requirements (@, .com/.co etc.)
     * @param arg {String}
     * @returns {String|*}
     */
    checkEmail(arg) {
      this.validEmail = validatorEmail(arg) === 'valid';
      return validatorEmail(arg)
    },
    checkPassword(arg) {
      this.validPass = validatorPassword(arg) === 'valid';
      return validatorPassword(arg)
    },
  }
}
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";
@import "../assets/css/fontPoppins.css";

h1 {
  font-size: 3rem;
}

.login-container {
  top: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.loginComponent {
  padding: 1rem;
  display: grid;
  grid-template:
      "headerLogin" auto
      "contentLogin" auto
  /100%;
  align-items: center;
  background-color: #2d2d2d;
  color: #efefef;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
}

.headerLogin {
  grid-area: headerLogin;
  display: flex;
  flex-direction: column;
}

.headerLogin button {
  align-self: flex-end;
  background-color: white;
  color: rgb(173, 58, 12);
  border: 2px white solid;
  cursor: pointer;
}

.headerLogin button:hover {
  background-color: red;
  color: white;
  border: 2px solid red;
}

.inputComponent {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  padding-left: 3rem;
  font-size: 1.2rem;
  margin-top: 0.3rem;
  margin-bottom: 2rem;
  /*background-color: lightgray;*/
}

.valid {
  background-color: #c2f8b5;
}

.invalid {
  background-color: #f8bfbf;
}

.contentLogin label {
  font-size: 1.6rem;
}

.contentLogin {
  grid-area: contentLogin;
}

.contentLogin .passwordReq {
  font-size: 0.8rem;
  word-spacing: 0rem;
  text-align: center;
}

.btnLogin {
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.btnLogin:hover {
  background-color: #0e9eb1;
  cursor: pointer;
}

.btnLoginInactive {
  background-color: rgb(54, 57, 58);
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
  cursor: not-allowed;
}

.logOut {
  background-color: rgb(162, 7, 7);
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.logOut:hover {
  background-color: red;
}
</style>