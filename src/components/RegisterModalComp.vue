<template>
  <div class="register-container">
    <div class="registerComponent">
      <div class="headerRegister">
        <button @click="closeRegister()">X</button>
        <h1 v-if="this.getUser === null">Register</h1>
      </div>
      <div class="contentRegister">
        <label for="user">User Name</label><br/>
        <input
          class="inputComponent"
          id="userNameInput"
          type="text"
          name="user"
          minlength=4
          placeholder="Enter user name..."
          v-model="userName"
          required
        /><br/>
        <label for="user">Email</label><br/>
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
        <label for="password">Confirm Password</label><br/>
        <p class="passwordReq">
          <span
            style="color:green"
            v-if="matchPass"
          >
            &#10004; Passwords match
          </span>
          <span
            style="color: red"
            v-else
          >
            &#10006; Passwords don't match
          </span>
        </p>
        <input
          :class='["inputComponent",checkPasswordMatch(passwordCheck)]'
          type="password"
          name="password"
          minlength=6
          placeholder="Enter password..."
          v-model="passwordCheck"
          required
        /><br/>
        <p class="passwordReq">
          <span
            style="color: red"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </span>
        </p>
        <button
          :class="[
            checkPassword(password) === 'valid'
            && checkEmail(email) === 'valid'
            && matchPass
            && userName
            ? 'btnRegister'
            : 'btnRegisterInactive']"
          type="submit"
          @click="submitRegister()"
        >Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import validatorEmail from "@/Libraries/validatorEmail";
import validatorPassword from "@/Libraries/validatorPassword";
import ServerEvents from "@/Libraries/ServerEvents";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'RegisterModalComp',
  emits: {
    // null -> No validation needed
    closeRegister: null,
  },
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      passwordCheck: '',
      validEmail: false,
      validPass: false,
      matchPass: false,
      register: false,
      errorMessage: '',
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getNewUser: "user/getNewUser"
    })
  },
  methods: {
    ...mapActions({
      loadUser: "user/loadUser",
      loadAdmin: "user/loadAdmin",
      saveUserLocal: "user/saveUserLocal",
      deleteUserLocal: "user/deleteUserLocal",
      loadNewUser: "user/loadNewUser",
      resetNewUser: "user/resetNewUser",
    }),
    closeRegister() {
      this.$emit('closeRegister');
    },
    submitRegister() {

      ServerEvents.getUserList().then(
        response => {
          let data = response.data.results;

          data.forEach(item => {
              if (item.email === this.email) {
                this.errorMessage = "l'email existe déjà"
                setTimeout(() => {
                  this.errorMessage = ''
                }, 3000)
                throw new Error("l'email existe déjà")
              }
            }
          )
          let newUser = this.getNewUser;
          newUser.id = data[data.length - 1].id + 1;
          newUser.name = this.userName;
          newUser.email = this.email;
          newUser.password = this.passwordCheck;
          this.loadNewUser(newUser);
        }
      )
        .then(() => {
          ServerEvents.postNewUser("[" + JSON.stringify(this.getNewUser) + "]")
            .then(() => {
                this.resetNewUser();
              }
            )
        })
        .catch(err => console.warn('error promisiune:' + err));
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
    checkPasswordMatch(arg) {
      if (arg === "") return
      arg === this.password ? this.matchPass = true : this.matchPass = false;
      return this.matchPass ? 'valid' : 'invalid'
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

.register-container {
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

.registerComponent {
  padding: 1rem;
  display: grid;
  grid-template:
      "headerRegister" auto
      "contentRegister" auto
  /100%;
  align-items: center;
  background-color: #2d2d2d;
  color: #efefef;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
}

.headerRegister {
  grid-area: headerRegister;
  display: flex;
  flex-direction: column;
}

.headerRegister button {
  align-self: flex-end;
  background-color: white;
  color: rgb(173, 58, 12);
  border: 2px white solid;
  cursor: pointer;
}

.headerRegister button:hover {
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

.contentRegister label {
  font-size: 1.6rem;
}

.contentRegister {
  grid-area: contentRegister;
}

.contentRegister .passwordReq {
  font-size: 0.8rem;
  word-spacing: 0rem;
  text-align: center;
}

.btnRegister {
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

.btnRegister:hover {
  background-color: #0e9eb1;
  cursor: pointer;
}

.btnRegisterInactive {
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