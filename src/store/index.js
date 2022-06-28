import {createStore} from 'vuex'
import products from "@/store/modules/products";
import category from "@/store/modules/category";
import cart from "@/store/modules/cart";
import selectedcateg from "@/store/modules/selectedcateg";
import productDetail from "@/store/modules/productDetail";
import user from "@/store/modules/user";

export default createStore({
    modules: {
        products,
        category,
        cart,
        selectedcateg,
        productDetail,
        user
    }
});