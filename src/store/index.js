
import { createStore } from 'vuex'


const store = createStore({
  state () {
    return {
      LOCAL_KEY_CART_products:[]
    }
  },
  mutations: {
    addProduct (state,product) {
      state.LOCAL_KEY_CART_products.push(product)
    }
  }
})


export default store;