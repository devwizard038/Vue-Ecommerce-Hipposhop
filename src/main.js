import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import 'animate.css';
import {createStore} from 'vuex';
import products from "@/store/products";
import category from "@/store/category";
import cart from "@/store/cart";
import selectedcateg from "@/store/selectedcateg";
import productDetail from "@/store/productDetail";

// Create a new store instance.
const store = createStore({
    modules: {
        products,
        category,
        cart,
        selectedcateg,
        productDetail
    }
});

let app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');


