<template>
	<div class="cartContainer">
		<div class="topContainer">
			<h1>Your Cart</h1>
			<button @click="closeCart()">X</button>
		</div>
		<div class="itemContainer">
			<div class="itemList" v-for="item in cart" :key="item.id">
				<p>{{item.title}}</p>
				<p class="price">{{item.price}}$</p>
				<p class="price">{{item.quantity}} {{item.unit}}</p>
				<a @click="deleteCartItem(item)">&#9747;</a>
			</div>
			<p>+ Shipping: 1.99$</p>
		</div>
		<div class="checkOutContainer">
			<h2>Total : {{this.totalPrice}} $</h2>
			<button class="outBtn">Check Out</button>
		</div>
	</div>

</template>

<script>
import { SHOP_KEY, TABLES } from "@/const";
export default {
	name: "ShoppingCartComponent",
	emits: ['closeCart'],
	
	data() {
		return {
			cart: JSON.parse(this.$store.getters["cart/getList"]),
			totalPrice: 0,
		}
	},
	methods: {
		closeCart() {
			this.$emit('closeCart')
		},
		totalPriceDisplay(){
			for(let item in this.cart){
				console.log(item)
				this.totalPrice = this.totalPrice + (this.cart[item].quantity * this.cart[item].price)
			}
			return this.totalPrice
		},
		deleteCartItem(item){
			let cartOld =  JSON.parse(
        localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)
      );
			let index = cartOld.indexOf(item);
			cartOld.splice(index,1)
			localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(cartOld)
        );
			this.cart=this.$store.getters["cart/getList"];
		}
		
	},
	computed: {
    //  Retrieve list from LocalStorage.
    cartItems() {
      return this.$store.getters["cart/getList"]
    }
  },
	mounted() {
		this.$store.dispatch("cart/loadList", this.data)
		this.totalPriceDisplay()
		console.log(this.cartItems)
	},
	watch:{
		cartUpdate(){
			if(this.$store.getters["cart/getList"] != this.cartItems){
				this.cartItems = this.$store.getters["cart/getList"];
			}
		}
	}
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.topContainer {
	background: rgb(173, 58, 12);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
}

.topContainer button {
	position: absolute;
	right: 0;
	margin-right: 0.4rem;
	background-color: white;
	color: rgb(173, 58, 12);
	border: 2px white solid;
	cursor: pointer;
}

.topContainer button:hover {

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

.cartContainer {
	position: fixed;
	z-index: 999;
	width: 30vw;
	height: 100vh;
	margin: 0 0;
	background-color: white;
	right: 0;
	border: 2px solid rgb(173, 58, 12);
	;
}

.itemContainer {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-family: 'Roboto', sans-serif;
}

.itemList {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	width: auto;
	/* border: 2px solid black; */
}

.itemList a {
	position: relative;
	align-items: flex-end;
	color: red;
	border: black 2px solid;
	cursor: pointer;
	font-weight: bold;
}

.itemList a:hover {
	color: white;
	background-color: red;
	border: red 2px solid;
	font-weight: bold;

}

.itemList p {
	padding-right: 2rem;

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
</style>