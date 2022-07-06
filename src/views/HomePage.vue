<template>
  <div class="homeContainer">
    <div class="table">
      <!-- Display: Category List-->
      <div class="left">
        <div class="loaderCategories" v-if="this.getCategories.length < 1"></div>
        <CategoryComp @selected="getSelectedCategory"
                      @breadCrumb="getBreadCrumb"/>
      </div>
      <!-- Display: Products -->
      <div class="right">
        <div class="loader" v-if="this.getProducts.length < 1"></div>
        <ProductsListComp
            :categoryId="categoryId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryComp from "@/components/CategoryComp.vue";
import ProductsListComp from "@/components/ProductsListComp.vue";
import {mapActions, mapGetters} from "vuex";


export default {
  name:'HomePage',
  components: {
    CategoryComp,
		ProductsListComp
  },
  data() {
    return {
      categoryId: 0,
      loading:true,
    };
  },
  computed: {
    ...mapGetters({
      getId: "selectedcateg/getId",
      getProducts: "products/getProducts",
      getCart: "cart/getCart",
      getCategories:"category/getCategories"
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
  beforeMount() {
    this.saveProducts();
  },
  mounted() {
    this.loadCart()
    if (this.getCart === null) {
      this.updateCart([])
    }
  },
  methods: {
    ...mapActions({
      saveProducts:"products/saveProducts",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
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

<style>

.loader {
  position:absolute;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rem;
  left: 0;
  right: 0;
  text-align: center;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

.loaderCategories{
  position:absolute;
  margin-left: 5rem;
  margin-top: 10rem;
  left: 0;
  right: 0;
  text-align: center;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

.homeContainer{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-template:
      "content" 100%
      / 100%;
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
  grid-template: "left right" 100%/ 350px auto;
}

.table .left{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: visible;
  grid-area: left;
  grid-template: "leftContent" 100%/100%;
}

.table .right{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  grid-area: right;
  grid-template: "rightContent" 100%/100%;
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.85rem;
  }
}
</style>