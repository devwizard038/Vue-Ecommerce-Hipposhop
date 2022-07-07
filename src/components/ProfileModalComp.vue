<template>
  <div class="register-container">
      <div class="form">
        <button
          class="closeModal"
          @click="closeProfile()"
        >X</button>
        <div class="title">Bonjour!</div>
        <div class="subtitle">
          Modifier votre compte!</div>

        <div class="input-container ic1">
          <input
            id="userName"
            ref="userInput"
            :class='[
              "input",userName.length > 2 ? "valid" : "",
              userName.length > 0 && userName.length <= 2  ? "invalid" : "",
              ]'
            type="text"
            placeholder=" "
            v-model="userName"
            :readOnly="this.readOnlyToggleUser"
          />
          <div class="cut cut-long"></div>
          <label for="email" class=placeholder>Nom d'utilisateur</label>
        </div>
        <button
          v-if="this.readOnlyToggleUser"
          type="text"
          class="submit"
          @click="() => {
            this.readOnlyToggleUser = !this.readOnlyToggleUser
            this.$refs.userInput.focus()
          }">
          Modifier L'utilisateur
        </button>
        <div class="actionContainer" v-if="!this.readOnlyToggleUser">
          <button
            type="submit"
            class="updateBtn"
            @click="() => {
              if(userName !== userNameFromServer){
                readOnlyToggleUser = true
                updatedUser = true;
              }
          }">Save</button>
            <button
              class="cancelBtn"
              @click="cancelUserChange()">Cancel</button>
        </div>
        <div class="input-container ic2">
          <input
            ref="emailInput"
            id="email"
            :class='["input",checkEmail(emailFromServer)]'
            type="email"
            placeholder=" "
            v-model="email"
            :readOnly="this.readOnlyToggleEmail"
          />
          <div class="cut cut-short"></div>
          <label for="email" class=placeholder>E-mail</label>
        </div>
        <button
          v-if="this.readOnlyToggleEmail"
          type="text"
          class="submit"
          @click="() => {
            this.readOnlyToggleEmail = !this.readOnlyToggleEmail
            this.$refs.emailInput.focus()
          }">
          Modifier l'E-mail
        </button>
        <div class="actionContainer" v-if="!this.readOnlyToggleEmail">
          <button
            type="submit"
            class="updateBtn"
            @click="() => {
              if(email !== emailFromServer && checkEmail(email) === 'valid'){
                readOnlyToggleUser = true
                updatedEmail = true
                readOnlyToggleEmail = true;
              }
          }">Save</button>
          <button
            class="cancelBtn"
            @click="cancelEmailChange()">Cancel</button>
        </div>
        <div class="input-container ic2">
          <input
            ref="passInput"
            id="password"
            :class='["input",checkPassword(password)]'
            type="password"
            placeholder=" "
            v-model="password"
            :readOnly="readOnlyTogglePass"
          />
          <div :class='["cut",readOnlyTogglePass ? "cut-long3" : "cut-long4"]'></div>
          <label for="password" class="placeholder">{{this.readOnlyTogglePass ? 'Mot de passe' : 'Nouveau mot de passe' }}</label>
          <button
            v-if="readOnlyTogglePass"
            type="text"
            class="submit"
            @click="
            this.password = ''
            this.readOnlyTogglePass = !this.readOnlyTogglePass;
            this.$refs.passInput.focus()
          ">
            Modifier le mot de Passe
          </button>
        </div>
        <div class="input-container ic3" v-if="!readOnlyTogglePass">
          <input
            id="passwordConfirm"
            :class='["input",checkPasswordMatch(passwordConfirm)]'
            type="password"
            placeholder=" "
            v-model="passwordConfirm"
          />
          <div class="cut cut-long2" v-if="!readOnlyTogglePass"></div>
          <label for="password" class="placeholder">Confirmez le mot de passe</label>
          <div class="actionContainer" v-if="!this.readOnlyTogglePass">
            <button
              type="submit"
              class="updateBtn"
              @click="() => {
                if(password !== passwordFromServer){
                   updatedPass = true;
           readOnlyTogglePass = true;
           passwordConfirm = '';
                }
            }">Save</button>
            <button
              class="cancelBtn"
              @click="cancelPassChange()">Cancel
            </button>
          </div>
        </div>
        <div class="input-container ic4" v-if="!readOnlyTogglePass">
          <p
            :style='[passwordConfirm.length > 0 && password !== passwordFromServer ? "color: green": "",
             passwordConfirm.length > 0 && password === passwordFromServer ? "color: red": ""
             ]'
          ><span>{{passwordConfirm.length > 0 && password !== passwordFromServer ? "&#9745;":"&#9744;" }}</span>
            Le nouveau mot de passe est différent de l'ancien.</p>
          <p
            :style='[password.length > 0 && checkPassword(password) === "valid" ? "color:green" : "",
          password.length > 0 && checkPassword(password) === "invalid" ? "color:red" :""
          ]'
          ><span>{{password.length > 0 && checkPassword(password) === "valid" ? "&#9745;":"&#9744;" }}</span>
            Le mot de passe doit comporter au moins huit caractères, une lettre majuscule et un chiffre.</p>
          <p
            :style='[passwordConfirm.length > 0 && passwordConfirm === password ? "color:green" : "",
          passwordConfirm.length > 0 && passwordConfirm !== password ? "color:red" : ""
          ]'
          ><span>{{password.length > 0 && passwordConfirm === password ? "&#9745;":"&#9744;" }}</span>
            Les mots de passe correspondent.</p>
        </div>
        <div class="input-container ic5" v-if="updatedEmail || updatedUser || updatedPass">
          <hr/>
          <p
            class="errorMsg"
            v-if="this.errorMessage !== null"
            style="color:red; text-transform: uppercase"
          > Error: {{ this.errorMessage }}!
          </p>
          <button
            type="submit"
            class="submitToServer"
            @click="
              modifyUser()
            ">
            Modifier le Compte
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
      errorMessage: null,
      idFromServer: null,
      userNameFromServer: '',
      emailFromServer: '',
      passwordFromServer: '',
      updatedUser: false,
      updatedEmail: false,
      updatedPass: false,
      readOnlyToggleUser:true,
      readOnlyToggleEmail:true,
      readOnlyTogglePass:true,
      passwordConfirm:'',
      userToModify:null,
      admin: false,
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getNewUser: "user/getNewUser"
    }),
  },
  beforeMount() {
    this.extractName()
      .then(()=>{
        this.userName = this.userNameFromServer
        this.email = this.emailFromServer
        this.password = this.passwordFromServer
        ;}
      );

  },
  methods: {
    ...mapActions({
      loadUser: "user/loadUser",
      resetNewUser: "user/resetNewUser",
      saveModifiedUserLocal:"user/saveModifiedUserLocal"
    }),
    modifyUser(){
      ServerEvents.getUserList()
        .then(
        response => {
          let data = response.data.results;
          data.forEach(item => {
              if ( this.updatedEmail && item.email === this.email) {
                this.errorMessage = "l'email existe déjà"
                setTimeout(()=> this.errorMessage = null, 4000)
              }
            }
          )})
        .then(() => {
          if(this.errorMessage === null){
            this.userToModify = [{
              id:this.idFromServer,
              name:this.userName,
              email: this.email,
              password: this.password,
              admin: this.admin
            }]
            ServerEvents.postNewUser(JSON.stringify(this.userToModify))
              .then(()=>{
                this.loadUser(this.email)
                this.saveModifiedUserLocal(...this.userToModify)
                this.updatedUser = false;
                this.updatedEmail = false;
                this.updatedPass = false;
                this.userToModify = null;
              })
            } else setTimeout(()=> this.errorMessage = null, 4000)

          }
        )
        .catch(err => console.log(err))
    },
    extractName() {
      return ServerEvents.getUserList()
        .then(response => {
          let data = response.data.results;
          data.forEach(item => {
              if (item.email === this.getUser) {
                this.idFromServer = item.id;
                this.userNameFromServer = item.name;
                this.emailFromServer = item.email;
                this.passwordFromServer = item.password;
                this.admin = item.admin
              }
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
        arg === this.password ? this.matchPass = true : this.matchPass = false;
        return this.matchPass ? 'valid' : 'invalid'
    },
    closeProfile() {
      this.$emit('closeProfile');
    },
    cancelUserChange(){
      this.readOnlyToggleUser = true;
      this.updatedUser = false;
      this.userName = this.userNameFromServer;
    },
    cancelEmailChange(){
      this.readOnlyToggleEmail = true;
      this.updatedEmail = false
      this.email = this.emailFromServer
    },
    cancelPassChange(){
      this.readOnlyTogglePass = true;
      this.updatedPass = false;
      this.password = this.passwordFromServer
      this.passwordConfirm = '';
    }
  }
}
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";
@import "../assets/css/fontPoppins.css";

.focused{
  border: 2px white solid;
}

.errorMsg{
  color: red;
  text-align: center;
  font-size: 20px;
}

.actionContainer{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.updateBtn{
  background-color: #278510;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
  margin-top: 10px;
  outline: 0;
  text-align: center;
  width: 80%;
  margin-right: 6px;
}
.cancelBtn{
  background-color: #8f0a0a;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
  margin-top: 10px;
  outline: 0;
  text-align: center;
  width: 80%;
}


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


.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 70px;
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

.input-container p{
  font-size: 13px;
  color: #eee;
  font-family: sans-serif;
  padding-left: 0.2rem;
  width: 100%;
}

.validReq{
  color:green;
}

invalidReq{
  color:red
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.ic3{
  margin-top: 30px;
}

.ic4{
  margin-top: 60px;
}

.ic5{
  margin-top: 70px;
}
.input {
  background-color: #303245;
  border-radius: 12px;
  box-sizing: border-box;
  border:0px;
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
  width: 55px;
}

.cut-long{
  width: 110px;
}

.cut-long2{
  width: 170px
}

.cut-long3{
  width: 90px
}

.cut-long4{
  width: 145px;
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
  font-size: 12px;
  height: 30px;
  margin-top: 10px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submitToServer{
  background-color: #b45306;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
  margin-top: 10px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

.valid {
  background-color: rgba(39, 229, 23, 0.15);
}

.invalid {
  background-color: rgba(255, 0, 0, 0.15);
}

</style>