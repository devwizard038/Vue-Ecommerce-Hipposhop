<template>
  <div class="register-container">
    <div class="registerComponent">
      <div class="headerRegister">
        <button @click="closeProfile()">X</button>
        <h1>Détails du profil</h1>
        <p
          v-if="updated"
          style="color:green"
        >
          détails du profil mis à jour
        </p>
      </div>

      <div class="contentProfile">
        <div>
          <p class="detailsTitle">Nom</p>
          <div v-if="modifyUser">
            <input
              class="inputComponent"
              id="userNameInput"
              type="text"
              name="user"
              minlength=4
              placeholder="Nouveau nom..."
              v-model="userName"
              required
            />
            <br>
            <button
              class="btnChange"
              @click="userNameFromServer = userName; submitNewDetails()"
            >soumettre
            </button>
            <button
              class="cancel"
              @click="modifyUser = false"
            >annuler
            </button>
          </div>
          <div v-else>
            <label class="detailsContent">{{ userNameFromServer }}</label>
            <br>
            <button
              class="btnChange"
              @click="modifyUser = true"
            >changer
            </button>
          </div>
        </div>
        <br/>

        <div>
          <p class="detailsTitle">Email</p>
          <div v-if="modifyEmail">
            <input
              :class='["inputComponent",checkEmail(email)]'
              id="emailInput"
              type="email"
              name="user"
              minlength=4
              placeholder="Enter email..."
              v-model="email"
              required
            />
            <p class="passwordReq">
              <span
                style="color: red"
                v-if="errorMessage"
              >
                {{ errorMessage }}
              </span>
            </p>

            <button
              class="btnChange"
              @click="submitNewDetails()"
            >soumettre
            </button>
            <button
              class="cancel"
              @click="modifyEmail = false"
            >annuler
            </button>
          </div>
          <div v-else>
            <label class="detailsContent">{{ emailFromServer }}</label>
            <br/>
            <button
              class="btnChange"
              @click="modifyEmail = true"
            >changer
            </button>
          </div>
        </div>
        <br/>

        <div>
          <p class="detailsTitle">Password</p>
          <div v-if="modifyPassword">
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
              Minimum eight characters,
              <br/> at least one letter and one number
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
            <label class="detailsTitle">Confirm Password</label><br/>
            <p class="passwordReq">
              <span v-if="matchPass">
                <span style="color:green">&#10004;</span>
                <span>Passwords match</span>
              </span>
              <span v-else>
                <span style="color: red">&#10006;</span>
                <span>Passwords don't match</span>
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

            <button
              :class="[
                checkPassword(password) === 'valid'
                && matchPass
                ? 'btnChange'
                : 'btnChangeInactive'
                ]"
              type="submit"
              @click="passwordFromServer = password; submitNewDetails()"
            >soumettre
            </button>
            <button
              class="cancel"
              @click="modifyPassword = false"
            >annuler
            </button>
          </div>
          <div v-else>
            <button
              class="btnChange"
              @click="modifyPassword = true"
            >changer
            </button>
          </div>
        </div>
        <br/>

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
  name: 'ProfileModalComp',
  emits: {
    // null -> No validation needed
    closeProfile: null,
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
      modifyUser: false,
      modifyEmail: false,
      modifyPassword: false,
      idFromServer: null,
      userNameFromServer: '',
      emailFromServer: '',
      passwordFromServer: '',
      updated: false,
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getNewUser: "user/getNewUser"
    }),
  },
  beforeMount() {
    this.extractName();
  },
  methods: {
    ...mapActions({
      loadUser: "user/loadUser",
      resetNewUser: "user/resetNewUser",
    }),
    extractName() {
      ServerEvents.getUserList()
        .then(response => {
          let data = response.data.results;
          data.forEach(item => {
              if (item.email === this.getUser) {
                this.idFromServer = item.id;
                this.userNameFromServer = item.name;
                this.emailFromServer = item.email;
                this.passwordFromServer = item.password;
              }
            }
          )
        })
        .catch(err => console.warn('error promisiune:' + err));
    },
    submitNewDetails() {
      ServerEvents.getUserList().then(
        response => {
          let data = response.data.results;

          data.forEach(item => {
              if (item.email === this.email) {
                this.errorMessage = "l'email existe déjà"
                setTimeout(() => {
                  this.errorMessage = ''
                }, 2500)
                throw new Error("l'email existe déjà")
              }
            }
          )
          let newDetails = this.getNewUser
          newDetails.id = this.idFromServer;
          newDetails.name = this.userNameFromServer;
          this.userName = '';
          if(this.email !== '') this.emailFromServer = this.email;
          newDetails.email = this.emailFromServer;
          this.email = '';
          newDetails.password = this.passwordFromServer;
          this.password = '';
          this.passwordCheck = '';
        }
      )
        .then(() => {
          ServerEvents.postNewUser("[" + JSON.stringify(this.getNewUser) + "]")
            .then(() => {
                this.loadUser(this.emailFromServer);
                this.modifyEmail = false;
                this.modifyUser = false;
                this.modifyPassword = false;
                this.updated = true;
                setTimeout(() => {
                  this.updated = false
                }, 2500);
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
    closeProfile() {
      this.$emit('closeProfile');
    },
  }
}
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";
@import "../assets/css/fontPoppins.css";

h1 {
  font-size: 2.3rem;
}

.detailsTitle {
  font-size: 1.5rem
}

.detailsContent {
  color: rgb(16, 191, 255);
  font-size: 1.1rem
}

.modify {
  color: rgb(16, 191, 255);
  cursor: pointer;
}

.modify:hover {
  text-decoration: underline;
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
      "contentProfile" auto
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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 2rem;
  padding-left: 2rem;
  font-size: 1.1rem;
  margin-top: 0.1rem;
  margin-bottom: 1.5rem;
  /*background-color: lightgray;*/
}

.valid {
  background-color: #c2f8b5;
}

.invalid {
  background-color: #f8bfbf;
}

.contentProfile label {
  font-size: 1.6rem;
}

.contentProfile {
  grid-area: contentProfile;
}

.contentProfile .passwordReq {
  font-size: 0.8rem;
  word-spacing: 0rem;
  text-align: center;
}

.btnChange {
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.6rem;
  border: none;
  text-decoration: none;
  margin-top: 0.5rem;
}

.btnChange:hover {
  background-color: #0e9eb1;
  cursor: pointer;
}

.btnChangeInactive {
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

.cancel {
  background-color: rgb(162, 7, 7);
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
  margin-left: 1rem;
}

.cancel:hover {
  background-color: red;
  cursor: pointer;
}
</style>