<template>
  <div class="productPageContainer">
    <div class="header">
      <h3>Products</h3>
      <hr/>
    </div>

    <div class="productContainer">
      <!-- Display: Selected category bred crumb -->
      <div class="bread-crumb">
        <span v-for="item in breadcrumb" @click="emitNode(item)" :key="item.id">
          >> {{ item.name ? item.name : item.title }}
        </span>
      </div>
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
    <ProductDetailComp
        v-if="showModal"
        @closeModal="closeModal"
        @addToCart="addToCart"
        :data="data"
    />
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
      category: '',
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
  emits: ["showModal"],
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
      loadId: "selectedcateg/loadId",
      loadCategory: "selectedcateg/loadCategory",
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
    },
    /**
     * Sort: Display selected category clicked on BreadCrumb element.
     * */
    emitNode(value) {
      this.loadId(value.id);
      this.loadCategory(value);
    }
  }
};
</script>

<style scoped>
.productPageContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template:
      "header" 50px
      "content" auto
      / auto;
}

.header {
  grid-area: header;
  height: 100%;
  width: 100%;
}

.productContainer{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  grid-area: content;
  display: grid;
  grid-template:
      "breadCrumb" 20px
      "content" auto
      / auto;
}

.bread-crumb {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  grid-area: breadCrumb;
}

.bread-crumb span {
  cursor: pointer;
}

.bread-crumb span:hover {
  color: #2095E1FF;
}

.product {
  word-spacing: 0.1rem;
  padding-block: 0.4rem;
  overflow: auto;
  height: 85vh;
  width: 100%;
  box-sizing: content-box;
  grid-area: content;
  top: 0;
  bottom: 0;
}

.product::-webkit-scrollbar {
  width: 16px;
}

.product::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.product::-webkit-scrollbar-thumb {
  background-color: rgb(16, 191, 255);
  border-radius: 100px;
}

h3 {
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
}

li {
  padding-top: 0.3rem;
}

@media (max-width: 600px) {
  h3 {
    font-size: 1rem;
  }

  .product::-webkit-scrollbar {
    width: 6px;
  }

  .product-box {
    /*margin-left: 0.2rem;*/
  }
}
</style>