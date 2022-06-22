<template>
  <div class="productPageContainer">
    <div class="headerTitle">
      <h3>Products</h3>
      <hr/>
    </div>
    <div class="productContainer">
      <!-- Display: Selected category bred crumb -->
      <div class="breadCrumb">
        <span
          v-for="item in breadcrumb"
          @click="emitNode(item)"
          :key="item.id">
          >> {{ item.name ? item.name : item.title }}
        </span>
        <div class="filterList">
          <input
            class="searchList"
            type="text"
            placeholder="Search.."
            @input="this.searchProduct($event.target.value)"
          >
          <select
            class="sortList"
            @change="this.sortProducts($event.target.value)">
            <option value=0>Default</option>
            <option :value="sortPriceAsc">Pret Ascendent</option>
            <option :value="sortPriceDesc">Pret Descendent</option>
            <option :value="sortAlphAsc">A-Z</option>
            <option :value="sortAlphDesc">Z-A</option>
          </select>
        </div>

      </div>
      <div
        class="product"
        ref="productsList"
      >
        <div
          v-for="product in products"
          :key="product.id"
          :ref="'productsDetails' + product.id"
          :data-id="product.id"
          :data-img="product.image"
        >
          <ProductComp
            :showModal="this.showModal"
            @toggleModal="toggleModal"
            @addToCart="addToCart"
            :name="product.title"
            :price="product.price"
            :image="productImage(product.id)"
            :unit="product.unit"
            :product="product"
          />
        </div>
      </div>
    </div>
    <ProductDetailComp
      v-if="showModal"
      @closeModal="closeModal"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
import ProductComp from "./ProductComp.vue";
import ProductDetailComp from "@/components/ProductDetailComp.vue";
import {mapActions, mapGetters} from "vuex";
import {FILTERS} from "@/const";

export default {
  name: "ProductsPage",
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
  emits: {
    showModal: null,
  },
  data() {
    return {
      showModal: false,
      category: '',
      sortPriceAsc: FILTERS.PRICE_ASC,
      sortPriceDesc: FILTERS.PRICE_DESC,
      sortAlphAsc: FILTERS.A_Z,
      sortAlphDesc: FILTERS.Z_A,
      intersectionObserver: null,
      images: []
    }
  },
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
    let callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.images[entry.target.dataset.id]
            = entry.target.dataset.img;
        }
      });
    };
    this.intersectionObserver = new IntersectionObserver(callback, {
      root: this.$refs.productsList,
      threshold: 0,
    });
  },

  updated() {
    Object.entries(this.$refs).forEach(item => {
      let target = item.at(1);
      if (Array.isArray(target) && target.length) {
        this.intersectionObserver.observe(target.at(0));
      }
    })
  },
  methods: {
    ...mapActions({
      searchProduct: "products/searchProduct",
      sortProducts: "products/sortProducts",
      loadDetails: "productDetail/loadDetails",
      loadProducts: "products/loadProducts",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
      loadCategories: "category/loadCategories",
      loadId: "selectedcateg/loadId",
      loadCategory: "selectedcateg/loadCategory",
    }),
    productImage(id) {
      return this.images[id] ? this.images[id] : null;
    },
    /**
     * Open details page and add item name to breadCrumb
     */
    toggleModal(item) {
      if (item !== undefined) {
        this.showModal = !this.showModal;
        this.breadcrumb.push(item);
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
    /**
     * @button: addToCart function
     */
    addToCart(item) {
      /**
       * Catch error: if local storage cart is empty
       */
      if (item.quantity) {
        this.loadCart();
        let localCart = this.getCart;
        if (localCart === null) {
          localCart = [item];
        } else {
          let currentProduct = localCart.find(
            product => product._id === item._id
          );

          if (currentProduct) {
            currentProduct.quantity += item.quantity;
          } else {
            localCart.push(item);
          }
        }
        this.updateCart(localCart);
      }
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

<style>
.productPageContainer {
  grid-area: rightContent;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template:
      "headerTitle" 5%
      "content" 95%
      / 100%;
}

.headerTitle {
  grid-area: headerTitle;
  height: 100%;
  width: 100%;
}

.productContainer {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  grid-area: content;
  display: grid;
  grid-template:
      "breadCrumb" 4%
      "content" 96%
      / 100%;
}

.breadCrumb {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: breadCrumb;
}

.bread-crumb span {
  cursor: pointer;
}

.bread-crumb span:hover {
  color: #2095E1FF;
}

.searchList {
  margin-left: auto;
}

.filterList .sortList {
  margin-left: 1rem;
}

.filterList {
  margin-left: auto;
  margin-right: 2rem;
}

.product {
  word-spacing: 0.1rem;
  overflow: auto;
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  grid-area: content;
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
}
</style>