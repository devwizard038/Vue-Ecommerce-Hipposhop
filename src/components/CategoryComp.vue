<template>

<h3>Categories</h3>
<ul>
    <li class="all-products"><a @click="clickId(0)">Toate produsele</a></li>
    <li class="category-item" v-for="categ in category" :key="categ.id"><a @click="clickId(categ.id)">{{categ.name}}</a></li>
</ul>

</template>

<script>
// import { SHOP_KEY,TABLES } from '@/const';

export default{
   name:'CategoryComponent',
   emits:['clickId'],
   computed: {
        category() {
            return this.$store.getters["category/getList"];
        },

    },
    mounted() {
        // let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`));
        this.$store.dispatch("category/loadList", this.data);
        // this.products = this.$store.getters["getList"];
    },
    methods: {
          clickId(e){
            this.$emit("clickId",e)
        }
    }
}

</script>

<style>
ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  border: 2px solid black;
  padding-right: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
a{
    text-decoration: none;
    cursor: pointer;
}

.all-products{
    color: rgb(185, 59, 0);
}

.all-products:hover{
    color: rgb(255, 92, 16);
}

.category-item{
    color: rgb(0, 0, 0);
}

.category-item:hover{
    color: rgb(255, 92, 16);
}
</style>