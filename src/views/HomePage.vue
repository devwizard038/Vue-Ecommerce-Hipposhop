<template>
  <div class="homeContainer">
    <div class="header">
      <h1>Home Page</h1>
    </div>
    <div class="table">
      <!-- Display: Category List-->
      <div class="left">
        <CategoryComp @selected="getSelectedCategory"
                      @breadCrumb="getBreadCrumb"/>
      </div>
      <!-- Display: Products -->
      <div class="right">
        <ProductPage
            :categoryId="categoryId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryComp from "@/components/CategoryComp.vue";
import ProductPage from "@/components/ProductPage.vue";
import {mapActions, mapGetters} from "vuex";


export default {
  components: {CategoryComp, ProductPage},
  data() {
    return {
      categoryId: 0,
    };
  },
  computed: {
    ...mapGetters({
      getId: "selectedcateg/getId",
      getProducts: "products/getProducts",
      getCategories: "category/getCategories",
      getCart: "cart/getCart"
    }),
    products() {
      return this.getProducts;
    },
    id() {
      return this.getId
    }
  },
  watch: {
    id(newId) {
      this.getSelectedCategory(newId)
    }
  },
  mounted() {
    /**
     * Catch error: for empty local storage for category and cart
     */
    if (this.getCategories === null) {
      this.updateCategories([])
    }
    this.loadCart()
    if (this.getCart === null) {
      this.updateCart([])
    }
  },
  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
      updateCategories: "category/updateCategories",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart"
    }),
    /**
     * Catch selected category id
     * @param {Integer} id
     */
    getSelectedCategory(id) {
      this.categoryId = Number(id);
    },
    getBreadCrumb(list) {
      this.breadCrumb = list;
    },
  }

}
</script>

<style scoped>
.homeContainer{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-template:
      "header" 80px
      "content" auto
      / 100%;
}

.header{
  width: 100%;
  height: 100%;
  grid-area: header;
}

h1 {
  text-align: center;
}

.table {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  grid-area: content;
  display: grid;
  grid-template-columns: 25% 75%;
  /*grid-template-rows:100%;*/
}

.table .left{
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  overflow: visible;
}

.table .right{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.85rem;
  }
}
</style>