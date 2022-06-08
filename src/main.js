import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'animate.css';
import { createStore } from 'vuex';
import products from "@/store/products";
import category from "@/store/category";
import cart from "@/store/cart"
import selectedcateg from "@/store/selectedcateg";


// Create a new store instance.
const store = createStore({
	modules: {
		products,
		category,
		cart,
		selectedcateg
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

