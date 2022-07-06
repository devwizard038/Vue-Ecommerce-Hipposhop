<template>
  <div class="productPageContainer">
    <div class="productContainer">
      <!-- Display: Selected category bred crumb -->
      <div class="breadCrumb">
        <div class="links">
					<span
						v-for="item in breadcrumb"
						@click="emitNode(item)"
						:key="item.id">
						> {{ item.name ? item.name : item.title }}
					</span>
				</div>

				<div class="filterList">
					<input
						class="searchList"
						type="text"
						placeholder="Rechercher un produit..."
						@input="this.searchProduct($event.target.value)"
					>
					<select
						class="sortList"
						@change="this.sortProducts($event.target.value)">
						<option value=0>Défaut</option>
						<option :value="sortPriceAsc">Prix croissants</option>
						<option :value="sortPriceDesc">Prix décroissants</option>
						<option :value="sortAlphAsc">Nom croissant</option>
						<option :value="sortAlphDesc">Nom décroissant</option>
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
            :product="typeof product === 'object' ? product : {}"
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
import {Category} from "@/models/Category";

export default {
  name: "ProductsListComp",
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
      getCategory: "selectedcateg/getCategory",
    }),
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
			let path = (category ? category.path() : []);

			if (!category || (category && category.id)) {
				let home = new Category({id: 0, name: "Accueil"});
				path.unshift(home);
			}
      return path;
    },
  },
  mounted() {
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
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
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
            product => product.id === item.id
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
      "content" 100%
      / 100%;
}

.productContainer {
  height: 100%;
  width: 100%;
  grid-area: content;
  display: grid;
  grid-template:
      "breadCrumb" 50px
      "content" auto
      / 100%;
}

.breadCrumb {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: breadCrumb;
	padding-left: 10px;
	background-image: linear-gradient(to right, #ffffff, #efefef);
}

.breadCrumb .links {
	height: 100%;
	padding-right: 10px;
	display: flex;
	align-items: center;
}

.breadCrumb span {
	margin-left: 10px;
  cursor: pointer;
}

.breadCrumb span:hover {
  color: #2095E1FF;
}

.filterList .searchList {
	width: 220px;
	padding: 7px;
	border-radius: 50px;
}

.filterList .sortList {
  margin-left: 10px;
	border-radius: 50px;
	padding: 2px;
}

.filterList {
  margin-left: auto;
  margin-right: 2rem;
}

.product {
  overflow: auto;
  height: 100%;
  box-sizing: content-box;
  grid-area: content;
	padding-left: 20px;
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