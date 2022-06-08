<template>
  <h3>Products</h3>

	<div class="bread-crumb">
		<span  v-for="item in breadcrumb" :key="item.id">
			>> {{ item.name }}
		</span>
	</div>

  <div class="breadCrumb">
    <div v-for="items in updatedBreadCrumb" :key="items.id">
      <a :class="items.title ? 'innactive' : ''" @click="clickBread(items)">{{ items.name ? items.name : items.title }}</a>
      <!-- **item is not the last -->
      <span class="separator" v-if="items !==
      updatedBreadCrumb[updatedBreadCrumb.length - 1]">
        |
      </span>
    </div>
  </div>

  <ProductDetailComp  @closeModal="closeModal" @addToCart="addToCart" :data="data" v-if="showModal"/>
  <div class="product-box">
    <div class="product">
      <ProductComp :showModal="this.showModal" @toggleModal="toggleModal" @addToCart="addToCart"
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
  
  data(){
    return{
      showModal: false,
      dataModal:null,
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
  emits: ["breadCrumbSelect", "breadCrumbUpdate","showModal"],
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
		breadcrumb() {
			let category = this.getCategory;
			return category ? category.path() : [];
		},
    /*
    * Adds selected categories to breadCrumb
    * */
    updatedBreadCrumb(){
      this.loadCategories()
      let list = this.getCategories
      let index = this.getId
      let arr=[]
      if((Array.isArray(list)&&list.length<1)|| list === null) return arr = []
      else {while(index != null){
        let temp = list.filter(n=> n.id === index);
        arr.unshift(...temp)
        index = temp[0].parent_id
      }
      return arr
      }
      
    }
  },
  mounted() {
    // Mounts LocalStorage list
    this.loadProducts()
  },
  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
      loadCategories: "category/loadCategories"
    }),

    clickBread(item) {
      this.$emit("breadCrumbSelect", item);
      let index = this.updatedBreadCrumb.indexOf(item);
      this.updatedBreadCrumb.splice(index+1);
      this.showModal = false;
    },

    /*
    * Open details page and add item name to breadCrumb
    * */
    toggleModal(item){
      if(item !== undefined) {
        this.showModal = !this.showModal
        this.updatedBreadCrumb.push(item)
        this.data = item
        if (this.showModal === true)
        this.$emit('showModal', this.showModal)
      }
    },
    closeModal(){
      if(this.showModal === true){
        this.showModal = false
        this.updatedBreadCrumb.pop()
      }
    },
    /*
    * @button: addToCart function
    * */
    addToCart(item,quantity) {

      item.quantity = quantity;

      let localCart = [];
      this.loadCart()
      localCart = this.getCart
      if(localCart === null && quantity > 0){
        localCart = [];
        localCart.push(item)
        this.updateCart(localCart)
        quantity = 0;
        return
      }
      if (quantity === 0) {
        return;
      } else if (localCart.filter((product) => product.id === item.id).length
          !== 0
      ) {
        localCart.filter(
          (product) => product.id === item.id
        )[0].quantity =
          Number(localCart.filter((product) => product.id === item.id)[0]
            .quantity) + quantity;
        this.updateCart(localCart)
      } else {
        localCart.push(item);
        this.updateCart(localCart)
      }
      quantity = 0;
    }
  }
};
</script>

<style scoped>
/* ol {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: scroll;
  overflow-y: scroll;
  height: 50vh;
  width: auto;
  border: 2px solid black;
} */

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

.innactive{
  color:grey;
  pointer-events: none;
}

.bread-crumb {
	display: flex;
	flex-direction: row;
	padding-left: 30px;
}

</style>