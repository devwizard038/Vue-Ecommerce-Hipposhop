<template>

<h3>Products</h3>
<div class="product-box">
    <ol  v-if="categoryId === 0">
        <li class="product" v-for="product in products" :key="product.id">{{`${product.title} - pret: ${product.price} lei / ${[product.unit]} `}}</li>
    </ol>
    <ol v-else>
        <li class="product" v-for="product in products.filter(product=> product.category_id === categoryId)" :key="product.id">{{`${product.title} - pret: ${product.price} lei / ${[product.unit]} `}}</li>
    </ol>
</div>

</template>

<script>
// import { SHOP_KEY,TABLES } from '@/const';

export default{
    props: ['categoryId'],
   name:'ProductsComponent',
   
   computed: {
        products() {
            return this.$store.getters["products/getList"];
        }
    },
    mounted() {
        // let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`));
        this.$store.dispatch("products/loadList", this.data);
        // this.products = this.$store.getters["getList"];
    },
}

</script>

<style>
ol{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow:hidden; 
  overflow-y:scroll;
  height:33vh; 
  width:60ch;
  border: 2px solid black;
}
li{
    padding-top: 0.3rem;
}

.product-box{
    padding-left: 2rem;
}

.product{
    word-spacing: 0.1rem;
    padding-block: 0.4rem;
    cursor: pointer;
}

</style>