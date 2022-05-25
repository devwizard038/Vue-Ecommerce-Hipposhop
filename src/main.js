import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store'
import { createStore } from 'vuex';
import products from "@/store/products";

// Create a new store instance.
const store = createStore({
	modules: {
		products,
		// categories
	}
});


let app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');


// iterare localStorage
// let tabel = JSON.parse(localStorage.getItem('LOCAL_KEY_CART_products'));
// console.log(tabel)
// for(let i=0; i< tabel.length; i++){
//     console.log(tabel[i].title)
// }

