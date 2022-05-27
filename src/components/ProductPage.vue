<template>

<h3>Products</h3>

<ol>
    <li v-for="product in products" :key="product.id">{{`${product.title} - pret: ${product.price} lei / ${[product.unit]} `}}</li>
</ol>

</template>

<script>
// import { SHOP_KEY,TABLES } from '@/const';

export default{
   name:'ProductsComponent',
   
   computed: {
        products() {
            return this.$store.getters["products/getList"];
        }
    },
    mounted() {
        console.log(this.$store);
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
  height:200px; 
  width:100%;
}
</style>