<template>

<h3>Categories</h3>
<ul>
    <li v-for="categ in category" :key="categ.id"><a href="#">{{categ.name}}</a></li>
</ul>

</template>

<script>
// import { SHOP_KEY,TABLES } from '@/const';

export default{
   name:'CategoryComponent',
   
   computed: {
        category() {
            return this.$store.getters["category/getList"];
        }
    },
    mounted() {
        console.log(this.$store);
        // let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`));
        this.$store.dispatch("category/loadList", this.data);
        // this.products = this.$store.getters["getList"];
    },
}

</script>

<style>
ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
a{
    text-decoration: none;
}
</style>