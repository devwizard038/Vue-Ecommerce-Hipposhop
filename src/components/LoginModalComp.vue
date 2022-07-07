<template>
  <div class="login-container">
    <div class="loginComponent">
      <div class="form">
        <button
          class="closeModal"
          @click="closeLogin()"
        >X</button>
        <div class="title">Bonjour!</div>
        <div class="subtitle">Connectez-vous à votre compte pour plus d'informations</div>
        <div class="input-container ic1">
          <input
            id="email"
            :class='["input",checkEmail(email)]'
            type="email"
            placeholder=" "
            v-model="email"
          />
          <div class="cut cut-short"></div>
          <label for="email" class=placeholder>E-mail</label>
        </div>
        <div class="input-container ic2">
          <input
            id="password"
            :class='["input",checkPassword(password)]' type="password" placeholder=" "
            v-model="password"
          />
          <div class="cut "></div>
          <label for="password" class="placeholder">Mot de passe</label>
        </div>
        <div
          style="
          padding-top: 12px;
          color:red;
          text-align:center;
          right:30%"
          v-if="this.loginError">Error: utilisateur ou mot de passe introuvable </div>
        <button
          type="text"
          :class='[checkEmail(email) === "valid" && checkPassword(password) === "valid" ? "submit" : "submitOff"]'
          @click="submitLogin()">Soumettre</button>
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
      getMessage: "message/getMessage"
    })
  },
  methods: {
    ...mapActions({
      loadUser: "user/loadUser",
      loadAdmin: "user/loadAdmin",
      saveUserLocal: "user/saveUserLocal",
      deleteUserLocal: "user/deleteUserLocal",
      loadLoginMessage: "message/loadLoginMessage",
      loadLogoutMessage: "message/loadLogoutMessage",
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
                this.saveUserLocal();
                this.loadLoginMessage();
              } else {
                this.loginError = true;
                setTimeout(()=>this.loginError = false,3500)}
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

.closeModal{
  position: absolute;
  background-color: #eee;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  right: 5%;
}

.closeModal:hover{
  background-color: #939393;
}

.closeModal:active{
  background-color: #484848;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
  position: relative;
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
  width: 92px;
}

.cut-short {
  width: 54px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
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

.input:focus ~ .placeholder {
  color: #d6d6de;
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

.submitOff {
  background-color: #4f4f4f;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: not-allowed;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
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

.valid {
  background-color: rgba(39, 229, 23, 0.15);

}

.invalid {
  background-color: rgba(255, 0, 0, 0.15);
}

/*//////////////////////*/

</style>