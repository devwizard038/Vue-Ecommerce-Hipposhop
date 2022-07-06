<template>
  <div class="login-container">
    <div class="loginComponent">
<!--      -->
      <div class="form">
        <button @click="closeLogin()">X</button>
        <div class="title">Bonjour!</div>
        <div class="subtitle">Connectez-vous à votre compte pour plus d'informations</div>
        <div class="input-container ic1">
          <input
            id="email"
            class="input"
            type="email"
            placeholder=" "
            v-model="email"
          />
          <div class="cut"></div>
          <label for="firstname" :class='["placeholder", checkPassword(email)]'>Email</label>
        </div>
        <div class="input-container ic2">
          <input id="email" class="input" type="password" placeholder=" " v-model="password"/>
          <div class="cut cut-short"></div>
          <label for="email" :class='["placeholder",checkPassword(password)]'>Password</label>
        </div>
        <button type="text" class="submit">submit</button>
      </div>
<!--      -->
      <div class="headerLogin">

        <h1 v-if="this.getUser === null">Login</h1>
      </div>
      <div class="contentLogin" v-if="this.getUser === null ">
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
        <p
          style="color: red"
          v-if="this.loginError">User or password don't match!</p>
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
import EventService from "@/Libraries/ServerEvents"
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
      loginError: false,
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
      saveUserLocal: "user/saveUserLocal",
      deleteUserLocal: "user/deleteUserLocal",
    }),
    closeLogin() {
      this.$emit('closeLogin');
    },
    submitLogin() {
      EventService.getUserList().then(
        response => {
          let data = response.data.results
            for (let item in data) {
              if (data[item].email === this.email && data[item].password === this.password) {
                this.loginError= false

                this.loadUser(this.email);
                if (data[item].admin) {
                  this.loadAdmin(true);
                } else this.loadAdmin(false);
                this.closeLogin();
                this.saveUserLocal()
              } else {this.loginError = true}
            }
        }
      )
        .catch(err => console.log('error promisiune:' + err));
    },
    submitLogout() {
      this.loadUser(null);
      this.loadAdmin(false);
      this.deleteUserLocal();
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

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.valid {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .valid {
  color: green;
}

.input:focus ~ .invalid {
  color: red;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
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
  color: green;
}

.invalid {
  color: red;
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