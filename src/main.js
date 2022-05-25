import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(router).use(store).mount('#app')


// iterare localStorage
// let tabel = JSON.parse(localStorage.getItem('LOCAL_KEY_CART_products'));
// console.log(tabel)
// for(let i=0; i< tabel.length; i++){
//     console.log(tabel[i].title)
// }

