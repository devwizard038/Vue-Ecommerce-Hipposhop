<template>
  <div class="cartContainer">
		<div class="topContainer">
			<h1>Your Cart</h1>
		<button @click="closeCart()">X</button>
		</div>
		<div class="itemContainer">
			<div class="itemList">
				<p>Item test 1</p>
				<p class="price">24.99$</p>
				<p class="price">QTY:3</p>
				<a>&#9747;</a>
			</div>
			<div class="itemList">
				<p>Item test 2</p>
				<p class="price">32.99$</p>
				<p class="price">QTY:2</p>
				<a>&#9747;</a>
			</div>
			<p>+ Shipping: 1.99$</p>
		</div>
		<div class="checkOutContainer">
			<h2>Total : 59,97 $</h2>
			<button class="outBtn">Check Out</button>
		</div>
	</div>
</template>

<script>
export default {
	name:"ShoppingCartComponent",
	emits:['closeCart'],
	methods:{
		closeCart(){
			this.$emit('closeCart')
		}
	}
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.topContainer{
	background: rgb(173, 58, 12);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
}

.topContainer button{
	position:absolute;
	right:0;
	margin-right:0.4rem;
	background-color: white;
	color: rgb(173, 58, 12);
	border: 2px white solid;
	cursor: pointer;
}

.topContainer button:hover{
	
	background-color: red;
	color: white;
	border: 2px red solid;
}

h1{
	color: white;
	display: flex;
	/* align-items: center;
	justify-content: center; */
	font-family: 'Kanit', sans-serif;
}

h2{
	font-family: 'Kanit', sans-serif;

}

.cartContainer {
  position: fixed;
	z-index: 999;
	width: 30vw;
	height: 100vh;
	margin: 0 0;
	background-color: white;
	right:0;
	border: 2px solid rgb(173, 58, 12);;
}

.itemContainer{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-family: 'Roboto', sans-serif;
}

.itemList{
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	width: auto;
	/* border: 2px solid black; */
}

.itemList a{
	position: relative;
	align-items: flex-end;
	color: red;
	border: black 2px solid; 
	cursor: pointer;
	font-weight: bold;
}

.itemList a:hover{
	color: white;
	background-color: red;
	border: red 2px solid;
	font-weight: bold;

}

.itemList p{
	padding-right: 2rem;
	
}

.checkOutContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.outBtn{
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

.outBtn:hover{
		background-color: rgb(219, 115, 74);
}
</style>