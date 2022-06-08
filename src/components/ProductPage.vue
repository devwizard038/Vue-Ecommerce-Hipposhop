<template>
  <h3>Products</h3>
  <!-- Display: Selected category bred crumb -->
  <div class="bread-crumb">
		<span v-for="item in breadcrumb" :key="item.id">
			>> {{ item.name ? item.name : item.title }}
		</span>
  </div>

  <ProductDetailComp
      v-if="showModal"
      @closeModal="closeModal"
      @addToCart="addToCart"
      :data="data"
  />

  <div class="product-box">
    <div class="product">
      <ProductComp
          :showModal="this.showModal"
          @toggleModal="toggleModal"
          @addToCart="addToCart"
          v-for="product in products"
          :key="product.id"
          :name="product.title"
          :price="product.price"
          :image="product.image"
          :unit="product.unit"
          :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductComp from "./ProductComp.vue";
import ProductDetailComp from "@/components/ProductDetailComp.vue";
import {mapActions, mapGetters} from "vuex";

export default {

  data() {
    return {
      showModal: false,
    }
  },
  components: {
    ProductComp,
    ProductDetailComp
  },
  props: {
    categoryId: {
      type: Number,
      default: () => 0,
    },
    breadCrumb: {
      type: Array,
      default: () => [],
    },
  },
  name: "ProductsComponent",
  emits: ["breadCrumbSelect", "breadCrumbUpdate", "showModal"],
  computed: {
    ...mapGetters({
      getProducts: "products/getProducts",
      getCart: "cart/getCart",
      getCategories: "category/getCategories",
      getId: "selectedcateg/getId",
      getCategory: "selectedcateg/getCategory",
    }),
    //  Retrieve list from LocalStorage.
    products() {
      if (this.categoryId) {
        return this.getProducts.filter(
            (product) =>
                (String(product.category_id) + ",")
                    .split(",")
                    .includes(String(this.categoryId)) === true
        );
      } else {
        return this.getProducts;
      }
    },
    /**
     * Loads selected category and returns path to parent
     */
    breadcrumb() {
      let category = this.getCategory;
      return category ? category.path() : [];
    },
  },
  mounted() {
    // Mounts LocalStorage list
    this.loadProducts();
  },
  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
      loadCategories: "category/loadCategories",
    }),
    /*
    * Open details page and add item name to breadCrumb
    * */
    toggleModal(item) {
      if (item !== undefined) {
        this.showModal = !this.showModal;
        this.breadcrumb.push(item);
        this.data = item;
        if (this.showModal === true)
          this.$emit('showModal', this.showModal);
      }
    },
    closeModal() {
      if (this.showModal === true) {
        this.showModal = false;
        this.breadcrumb.pop();
      }
    },
    /*
    * @button: addToCart function
    * */
    addToCart(item, quantity) {
      item.quantity = quantity;
      let localCart = [];
      this.loadCart();
      localCart = this.getCart;
      /**
       * Catch error: if local storage cart is empty
       */
      if (localCart === null && quantity > 0) {
        localCart = [];
        localCart.push(item);
        this.updateCart(localCart);
        quantity = 0;
        return;
      }
      if (quantity === 0) {
        return;
      } else if (localCart.filter((product) => product.id === item.id).length
          !== 0
      ) {
        localCart.filter(
            (product) => product.id === item.id)[0].quantity =
            Number(localCart.filter((product) => product.id === item.id)[0]
                .quantity) + quantity;
        this.updateCart(localCart)
      } else {
        localCart.push(item);
        this.updateCart(localCart);
      }
      quantity = 0;
    }
  }
};
</script>

<style scoped>

li {
  padding-top: 0.3rem;
}

.product-box {
  padding-left: 2rem;
}

.product {
  word-spacing: 0.1rem;
  padding-block: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  overflow-y: auto;
  height: 50vh;
  max-width: 45vw;
  /* border: 2px solid black; */
}

.product::-webkit-scrollbar {
  width: 16px;
}

.product::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.product::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}


.breadCrumb {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-weight: bold;
  font-style: italic;
  padding-left: 1.5rem;
}

.breadCrumb a {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  cursor: pointer;
}

.breadCrumb a:hover {
  color: rgb(255, 92, 16);
}

.innactive {
  color: grey;
  pointer-events: none;
}

.bread-crumb {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
}

</style>