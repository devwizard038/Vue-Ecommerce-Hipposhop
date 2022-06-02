<template>
  <h3>Products</h3>
  <div class="breadCrumb">
    <div v-for="items in breadCrumb" :key="items.id">
      <a @click="clickBread(items)">{{ items.name }}</a>
      <!-- **item is not the last -->
      <span class="separator" v-if="items != breadCrumb[breadCrumb.length - 1]">
        |
      </span>
    </div>
  </div>

  <div class="product-box">
    <ol class="product">
      <div>
        <ProductComp
          v-for="product in products"
          :key="product.id"
          :name="product.title"
          :price="product.price"
          :image="product.image"
          :unit="product.unit"
          :product="product"
        />
      </div>
    </ol>
    <!-- Loop and display products -->
    <!-- <ol>
			<li class="product" v-for="product in products" :key="product.id">
				{{ `${product.title} - pret:
								${product.price} lei / ${[product.unit]} `
				}}
			</li>
		</ol> -->
    <!-- Loop and display category_id filtered products -->
    <!--        <ol v-else>-->
    <!--            <li class="product" v-for="product in products.filter(product => product.category_id === categoryId)"-->
    <!--                :key="product.id">{{ `${product.title} - pret: ${product.price} lei / ${[product.unit]} ` }}</li>-->
    <!--        </ol>-->
  </div>
</template>

<script>
import ProductComp from "./ProductComp.vue";

export default {
  components: {
    ProductComp,
  },
  props: {
    categoryId: {
      type: Number,
      default: () => 0,
    },
    breadCrumb: {
      type: Array,
      default: () => ["Toate produsele"],
    },
  },
  name: "ProductsComponent",
  emits: ["breadCrumbSelect", "breadCrumbUpdate"],
  computed: {
    //  Retrieve list from LocalStorage.
    products() {
      if (this.categoryId) {
        return this.$store.getters["products/getList"].filter(
          (product) =>
            (String(product.category_id) + ",")
              .split(",")
              .includes(String(this.categoryId)) === true
        );
      } else {
        return this.$store.getters["products/getList"];
      }
    },
  },
  mounted() {
    // Mounts LocalStorage list.
    this.$store.dispatch("products/loadList", this.data);
  },
  methods: {
    clickBread(item) {
      this.$emit("breadCrumbSelect", item);
    },
  },
};
</script>

<style scoped>
ol {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: scroll;
  height: 50vh;
  width: auto;
  border: 2px solid black;
}

li {
  padding-top: 0.3rem;
}

.product-box {
  padding-left: 2rem;
}

.product {
  word-spacing: 0.1rem;
  padding-block: 0.4rem;
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
</style>