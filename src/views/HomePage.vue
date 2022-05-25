<template>
<h1>Home Page</h1>
{{ products }}
</template>

<script>

import {SHOP_KEY, TABLES} from "@/const";

export default {
    data() {
        return{
            // products: null,
            // data: null
        }
    },
    computed: {
        products() {
          return this.$store.getters["products/getList"];
        }
    },
    // beforeCreate() {
    //   console.log("beforeCreate");
    // },
    // created() {
    //   console.log("create");
    // },
    // beforeMount() {
    //   console.log("beforeMounted");
    // },
    mounted() {
      console.log(this.$store);
      let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
      this.$store.dispatch("products/loadList", data);

      // this.products = this.$store.getters["getList"];
    },


}
</script>