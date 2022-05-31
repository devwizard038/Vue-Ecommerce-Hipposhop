<template>

	<h3>Products</h3>
	<p><a v-for="items in breadCrumb" :key="items">{{items}} / </a></p>
	<div class="product-box">
		<!-- Loop and display products -->
		<ol>
			<li class="product" v-for="product in products" :key="product.id">
				{{ `${product.title} - pret:
								${product.price} lei / ${[product.unit]} `
				}}
			</li>
		</ol>
		<!-- Loop and display category_id filtered products -->
		<!--        <ol v-else>-->
		<!--            <li class="product" v-for="product in products.filter(product => product.category_id === categoryId)"-->
		<!--                :key="product.id">{{ `${product.title} - pret: ${product.price} lei / ${[product.unit]} ` }}</li>-->
		<!--        </ol>-->
	</div>

</template>

<script>



export default {
	props: {
		categoryId: {
			type: Number,
			default: () => 0
		},
		breadCrumb:{
			type:Array,
			default: () => ['Toate produsele']
		}
	},
	name: 'ProductsComponent',

	computed: {
		//  Retrieve list from LocalStorage.
		products() {
			if(this.categoryId){
				return this.$store.getters["products/getList"].filter(
					product => JSON.parse(product.category_id).includes(this.categoryId) === true
				)
				}
				else{ return this.$store.getters["products/getList"]}
		}
	},
	mounted() {
		// Mounts LocalStorage list. 
		this.$store.dispatch("products/loadList", this.data);
	},
}

</script>

<style>
ol {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: hidden;
	overflow-y: scroll;
	height: 33vh;
	width: 60ch;
	border: 2px solid black;
}

li {
	padding-top: 0.3rem;
}

.product-box {
	padding-left: 2rem;
}

.product {
	word-spacing: 0.1rem;
	padding-block: 0.4rem;
}
</style>