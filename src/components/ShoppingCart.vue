<template>
	<div class="cartContainer">
		<div class="topContainer">
			<h1>Your Cart</h1>
			<button @click="closeCart()">X</button>
		</div>
		<div class="itemContainer" v-if="this.cart.length > 0">
			<div class="itemBox">
				<div class="itemList" v-for="item in cart" :key="item.id">
					<img v-if="item.image === null"
						src="http://www.womens-southerngolfassociation.org/wp-content/uploads/2021/10/Image-Not-Available.png"
						alt="{{ name }}" />
					<img v-else :src="item.image" v-bind:alt="name" />
					<p class="title">{{ item.title }}</p>
					<p class="price">{{ item.price }}$</p>
					<input type="number" min="1" :value="item.quantity" @input="event => modifyItem(event.target.value, item)">
					<p class="price">{{ item.unit }}</p>
					<a @click="deleteCartItem(item)">&#9747;</a>
				</div>
			</div>
			<p>+ Shipping: 1.99$</p>
			<div class="checkOutContainer">
				<h2>Total : {{ this.totalPrice }} $</h2>
				<button class="outBtn">Check Out</button>
			</div>
		</div>
		<div class="empty" v-else>
			<h2>Your cart is empty !</h2>
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
			cart: JSON.parse(
				localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)),
			totalPrice: 1.99
		}
	},
	methods: {
		closeCart() {
			this.$emit('closeCart')
		},
		totalPriceDisplay() {
			for (let item in this.cart) {
				console.log(item)
				this.totalPrice = this.totalPrice + (this.cart[item].quantity * this.cart[item].price)
			}
			return this.totalPrice
		},
		deleteCartItem(item) {
			let cartOld = JSON.parse(
				localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)
			);
			let index = cartOld.indexOf(item);
			cartOld.splice(index, 1)
			localStorage.setItem(
				`${SHOP_KEY}-${TABLES.CART}`,
				JSON.stringify(cartOld)
			);
			this.cart = JSON.parse(
				localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`));
			this.totalPrice = 1.99;
			this.totalPriceDisplay();
		},
		modifyItem(value, item) {
			let cartOld = JSON.parse(
				localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)
			);
			for(let i=0; i< cartOld.length; i++){
				if(cartOld[i].id === item.id){
					cartOld[i].quantity = value
					localStorage.setItem(
				`${SHOP_KEY}-${TABLES.CART}`,
				JSON.stringify(cartOld)
			);
			this.cart = JSON.parse(
				localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`));
				this.totalPrice = 1.99
				this.totalPriceDisplay();
				}
			}
			
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
	watch: {
		cartUpdate() {
			if (this.$store.getters["cart/getList"] != this.cartItems) {
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
	width: 30vw auto;
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

.itemBox {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: auto;
}

.itemList {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #fbf7ec;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	border: 0.1px black solid;
	border-radius: 8px;
	margin-bottom: 0.7rem;
	width: auto;
	/* border: 2px solid black; */
	width: 100%;
}

.itemList input {
	width: 4ch;
}

.itemList img {
	height: 5.2rem;
	width: 6.5rem;
	/* max-height: 5rem; */
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