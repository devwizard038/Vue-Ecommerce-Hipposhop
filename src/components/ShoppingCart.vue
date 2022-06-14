<template>
  <div class="shopContainer">
    <div class="header">
      <h1>Your Cart</h1>
      <button @click="closeCart()">X</button>
    </div>
    <div class="itemContainer">
      <div class="contentContainer" v-if="this.cart.length > 0">
        <div  v-for="item in cart" :key="item.id">
          <div class="messageBox">
            <ShopCartMessageComp
                v-if="item.showMessage === true"
                :itemName="item.title"
                :deleteConfirm="deleteConfirm"
                :itemToDelete="item"
            />
          </div>
          <div class="itemList">
            <img
                v-if="item.image === null"
                src="http://www.womens-southerngolfassociation.org/wp-content/uploads/2021/10/Image-Not-Available.png"
                alt="{{ item.name }}"
            />
            <img
                v-else
                :src="item.image"
                :alt="item.name"
            />
            <p class="title">{{ item.title }}</p>
            <p class="price">{{ item.price }}$</p>
            <input
                type="number"
                min="1"
                :value="item.quantity"
                @input="event => modifyItem(event.target.value, item)"
            >
            <p class="price">{{ item.unit }}</p>
            <a @click="deleteClick(item)">&#9747;</a>
          </div>

        </div>
      </div>
      <div class="checkOutContainer" v-if="this.cart.length > 0">
        <p>+ Shipping: 1.99$</p>
        <h2>Total : {{ this.totalPrice + this.shipping }} $</h2>
        <button class="outBtn">Check Out</button>
      </div>
      <div class="empty" v-else>
        <h2>Your cart is empty !</h2>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ShopCartMessageComp from "@/components/ShopCartMessageComp"

export default {
  name: "ShoppingCartComponent",
  components: {ShopCartMessageComp},
  emits: ['closeCart'],

  data() {
    return {
      cart: [],
      totalPrice: 0,
      shipping: 1.99,
      //showMessage: false,
      deleteItem: false,
      itemToDelete: [],
    }
  },
  methods: {
    ...mapActions({
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
    }),
    deleteClick(item) {
      item.showMessage = true
      this.itemToDelete = item
    },
    deleteConfirm(deleteItem) {
      let item = this.itemToDelete
      console.log(item)

      if(deleteItem === true) {
        this.deleteCartItem(item)
        deleteItem = false
        console.log(true)
      } else {
        item.showMessage = false
        console.log(false)
      }

    },
    closeCart() {
      this.$emit('closeCart')
    },
    totalPriceDisplay() {
      this.totalPrice = 0;
      for (let item in this.cart) {
        this.totalPrice = this.totalPrice + (this.cart[item].quantity *
            this.cart[item].price);
      }
      return this.totalPrice;
    },
    deleteCartItem(item) {
      let cartOld = this.getCart;
      let newCart = cartOld.filter(n => n.id !== item.id);
      this.updateCart(newCart);
      this.loadCart();
      this.cart = this.getCart;
      this.totalPrice = 0;
      this.totalPriceDisplay();
    },
    modifyItem(value, item) {
      let cartOld = this.getCart
      for (let i = 0; i < cartOld.length; i++) {
        if (cartOld[i].id === item.id) {
          cartOld[i].quantity = value;
          this.updateCart(cartOld);
          this.loadCart();
          this.cart = this.getCart;
          this.totalPrice = 0;
          this.totalPriceDisplay();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getCart: "cart/getCart",
    })
  },
  mounted() {
    this.loadCart();
    this.cart = this.getCart;
    this.totalPriceDisplay();
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.shopContainer {
  position: absolute;
  right: 0;
  display: grid;
  grid-template:
      "header" 80px
      "content" auto
      /auto;
  width: 50vw;
  height: 100%;
  background-color: white;
}

.header {
  background-color: #2d2d2d;
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  height: 100%;
  width: 100%;

}

.header button {
  position: absolute;
  right: 0;
  margin-right: 0.4rem;
  background-color: white;
  color: rgb(173, 58, 12);
  border: 2px white solid;
  cursor: pointer;
}

.header button:hover {
  background-color: red;
  color: white;
  border: 2px red solid;
}

h1 {
  color: white;
  display: flex;
  /* align-items: center;
  justify-content: center; */
  font-family: 'Kanit', sans-serif;
}

h2 {
  font-family: 'Kanit', sans-serif;
}

.itemContainer {
  width: 100%;
  height: 100%;
  grid-area: content;
  display: grid;
  grid-template:
      "items" auto
      "footer" 200px
      /auto;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}

.contentContainer{
  grid-area: items;
  width: 100%;
  height: auto;
  min-height: 7rem;
  max-height: 30rem;
  overflow: auto;

}

.checkOutContainer{
  grid-area: footer;
  height: 100%;
  width: 100%;
}

.messageBox{

  /*display: flex;*/
  /*position: relative;*/
  /*flex-direction: row;*/
  /*width: inherit;*/
}

.itemList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #bbbbbb;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  width: inherit;
}

.itemList input {
  width: 4ch;
}

.itemList img {
  height: 20%;
  width: 20%;
  padding-right: 2rem;
  padding-left: 1rem;
}

.itemList a {
  position: relative;
  align-items: flex-end;
  color: red;
  border: black 2px solid;
  cursor: pointer;
  font-weight: bold;
  margin-right: 1rem;
}

.itemList a:hover {
  color: white;
  background-color: red;
  border: red 2px solid;
  font-weight: bold;

}

.itemList p {
  padding-right: 2rem;
  max-width: 10ch;
}

.itemList .title {
  position: relative;
  left: 0;
}

.checkOutContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.outBtn {
  background-color: rgb(173, 58, 12);
  font-family: 'Roboto', sans-serif;
  border: none;
  font-size: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.outBtn:hover {
  background-color: rgb(219, 115, 74);
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>