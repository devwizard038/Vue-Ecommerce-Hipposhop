<template>
  <h1>Home Page</h1>

  <hr/>
  <!-- {{ products }} -->
  <section class="tabel">
    <div v-if="memory != null && memory != []">
      <CategoryComp @selected="getSelectedCategory"
                    @breadCrumb="getBreadCrumb"/>
    </div>
    <div v-if="memory != null && memory != []">
      <ProductPage :categoryId="categoryId" :breadCrumb="breadCrumb"
                   @breadCrumbSelect="breadCrumbSelect"/>
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
      breadCrumb: [{id: 0, name: 'Toate Produsele'}],
    };
  },
  computed: {
    products() {
      return this.getProducts;
    },
    ...mapGetters({
      getId: "selectedcateg/getId",
      getProducts: "products/getProducts",
      getCategories: "category/getCategories",
      getCart: "cart/getCart"
    }),
    id() {
      return this.getId
    },
    memory() {
      return this.getCategories;
    }
  },
  watch: {
    id(newId) {
      this.getSelectedCategory(newId)
    }
  },
  mounted() {
    // let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
    // this.$store.dispatch("products/loadList", data);
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