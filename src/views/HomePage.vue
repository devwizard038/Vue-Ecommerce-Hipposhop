<template>
  <h1>Home Page</h1>

  <hr/>
  <section class="tabel">
    <!-- Display: Category bread crumb -->
    <div>
      <CategoryComp @selected="getSelectedCategory"
                    @breadCrumb="getBreadCrumb"/>
    </div>
    <!-- Display: Products -->
    <div>
      <ProductPage
          :categoryId="categoryId"

      />
    </div>
  </section>
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
    breadCrumbSelect(item) {
      this.categoryId = Number(item.id);
      let index = this.breadCrumb.indexOf(item)
      this.breadCrumb = this.breadCrumb.slice(0, index + 1)
    }
  }

}
</script>

<style scoped>
.tabel {
  display: flex;
  justify-content: center;
}
</style>