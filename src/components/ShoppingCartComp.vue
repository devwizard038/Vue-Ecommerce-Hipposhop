<template>
  <div class="shopContainer">
    <div class="header">
      <h1>Votre panier</h1>
      <button @click="closeCart()">X</button>
    </div>
    <div class="itemContainer">
      <div
        class="contentContainer"
        v-if="this.computedCart.length > 0"
      >
        <div
          v-for="item in this.computedCart"
          :key="item.id"
        >
          <div class="messageBox">
            <ShopCartMessageComp
              v-if="item.showMessage === true"
              :itemName="item.title"
              :deleteConfirm="deleteConfirm"
              :itemToDelete="this.deleteCartItem"
            />
          </div>
          <div class="itemList">
            <img
              v-if="item.image === null"
              src="../assets/images/no_image_available.jpg"
              alt="{{ item.name }}"
            />
            <img
              v-else
              :src="item.image"
              :alt="item.name"
            />
            <p class="title">{{ item.title }}</p>
            <p class="price">{{ item.price }}$</p>
            <p class="price"><input
              type="number"
              min="1"
              :value="item.quantity"
              @input="event => this.modifyCart({
              data:item, quantity:Number(event.target.value)})"
            >
              {{ item.unit }}
            </p>
            <a @click="deleteClick(item)">&#9747;</a>
          </div>
        </div>
      </div>
      <div
        class="checkOutContainer"
        v-if="this.computedCart.length > 0"
      >
        <ShopCartMessageComp
          v-if="emptyCartShow === true"
          itemName="Tous les articles"
          :deleteConfirm="deleteConfirm"
          :itemToDelete="itemToDelete"
        />
        <p>+ Expédition: 1.99€</p>
        <h2>Total : {{ (this.getCartPrice + this.shipping).toFixed(2)}}  €</h2>
        <div>
          <button class="outBtn">Commander</button>
          <button class="clearAll" @click="emptyCartConfirmation()">Panier clair</button>
        </div>
      </div>
      <div class="empty" v-else>
        <h2>Votre panier est vide !</h2>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ShopCartMessageComp from "@/components/ShopCartMessageComp"

export default {
  name: "ShoppingCartComp",
  components: {ShopCartMessageComp},
  emits: ['closeCart'],

  data() {
    return {
      totalPrice: 0,
      shipping: 1.99,
      deleteItem: false,
      itemToDelete: [],
      emptyCartShow:false,
    }
  },
  computed: {
    ...mapGetters({
      getCart: "cart/getCart",
      getCartPrice: "cart/getCartPrice",
    }),
    /**
     * @returns {Object} - Shopping Cart from localStorage
     */
    computedCart() {
      return this.getCart
    }
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    ...mapActions({
      loadCart: "cart/loadCart",
      deleteCartItem: "cart/deleteCartItem",
      modifyCart: "cart/modifyCart",
      emptyCart:"cart/emptyCart"
    }),
    /**
     * deleteClick + deleteConfirm -> Confirmation message for deleting an item from cart.
     * @param{Object} item
     */
    deleteClick(item) {
      item.showMessage = true
      this.itemToDelete = item
    },
    emptyCartConfirmation(){
      this.emptyCartShow = true;
      this.itemToDelete = "emptyCartConfirmation"
    },
    deleteConfirm(deleteItem) {
      let item = this.itemToDelete
      if (deleteItem) {
        if(item === "emptyCartConfirmation"){
          this.emptyCart()
          deleteItem = false
          this.emptyCartShow = false;
          return
        }
        this.deleteCartItem(item)
        deleteItem = false
      } else {
        if(item !== "emptyCartConfirmation") item.showMessage = false
        this.emptyCartShow = false;
      }
    },
    closeCart() {
      this.$emit('closeCart')
    },
  },
}
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";

.shopContainer {
  box-shadow: -3px 3px 8px 0px rgba(0,0,0,0.35);
  z-index: 1000;
  position: absolute;
  right: 0;
  display: grid;
  grid-template:
      "headerShopCart" 9%
      "contentShopCart" 91%
      /100%;
  width: 50vw;
  height: 100%;
  background-color: white;
  overflow: hidden;
}

.header {
  background-color: #2d2d2d;
  grid-area: headerShopCart;
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
  font-family: 'Kanit', sans-serif;
}

h2 {
  font-family: 'Kanit', sans-serif;
}

.itemContainer {
  width: 100%;
  height: 100%;
  grid-area: contentShopCart;
  display:grid;
  grid-template:
      "items" auto
      "footer" 300px
      /100%;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.contentContainer {
  grid-area: items;
  width: 100%;
  height: 100%;
  min-height: 7rem;
  max-height: 30rem;
  overflow: auto;
}

.contentContainer::-webkit-scrollbar {
  width: 10px;
}

.contentContainer::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.contentContainer::-webkit-scrollbar-thumb {
  background-color: rgb(16, 191, 255);
  border-radius: 100px;
}


.checkOutContainer {
  display: inline-block;
  grid-area: footer;
  height: 100%;
  width: 100%;
}

.checkOutContainer p {
  border: 2px black solid;
  padding: 0.5rem;
  border-radius: 1rem;
  font-weight: bold;
  color: white;
  background-color: #2d2d2d;
  margin-bottom: 1rem;
}

.messageBox {
  height: 100%;
}

.itemList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #dedede;
  max-height: 10rem;
  margin: 0.5rem;
  padding: 0.4rem;
  font-family: 'Poppins', sans-serif;
  flex-wrap: wrap;
  font-size: 1.1rem;
  min-font-size: 0rem;
  border-radius: 0.7rem;
}

.itemList input {
  align-items: center;
  width: 1rem;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  padding-left: 5px;
  margin-left: 2px;
  border-radius: 6px;
}

.itemList input {
  width: 4ch;
}

.itemList img {
  height: auto;
  width: auto;
  max-width: 10rem;
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
  max-width: 20ch;
}

.itemList .title {
  width: 30ch;
  position: relative;
  font-weight: bold;
}

.itemList .price {
  font-weight: bold;
}

.checkOutContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.outBtn {
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.outBtn:hover {
  background-color: rgb(7, 72, 96);
  cursor: pointer;
}

.clearAll {
  margin-left: 1rem;
  background-color: rgb(255, 16, 52);
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.clearAll:hover{
  background-color: rgb(194, 11, 38);
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>