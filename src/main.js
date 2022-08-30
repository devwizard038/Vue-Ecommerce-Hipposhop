import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "animate.css";
import store from "./store";
import { initializeApp } from "firebase/app";

let app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

export const firebaseInit = initializeApp({
  apiKey: "AIzaSyC8qBns0wzk1LLwuJDYI3UCPrxcQ6kuTsQ",
  authDomain: "hippo-shop-80389.firebaseapp.com",
  databaseURL:
    "https://hippo-shop-80389-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hippo-shop-80389",
  storageBucket: "hippo-shop-80389.appspot.com",
  messagingSenderId: "337782449589",
  appId: "1:337782449589:web:4f4f26b6ba94b6e52965fc",
  measurementId: "G-EMYVKVRNRX",
});
console.log(firebaseInit);
