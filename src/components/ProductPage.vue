<template>
  <h3>Products</h3>
  <div class="breadCrumb">
    <div v-for="items in updatedBreadCrumb" :key="items.id">
      <a :class="items.title ? 'innactive' : ''" @click="clickBread(items)">{{ items.name ? items.name : items.title }}</a>
      <!-- **item is not the last -->
      <span class="separator" v-if="items != updatedBreadCrumb[updatedBreadCrumb.length - 1]">
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
import { SHOP_KEY, TABLES } from "@/const";
import {mapGetters} from "vuex";
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

    /*
    * Adds selected categories to breadCrumb
    * */
    updatedBreadCrumb(){
      let list = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`))
      let index = this.getId
      let arr=[]
      console.log(list.length)
      if(list.length == 0) return arr = []
      else {while(index != null){
        let temp = list.filter(n=> n.id === index);
        arr.unshift(...temp)
        index = temp[0].parent_id
      }
      return arr
      }
      
    },
    ...mapGetters({
      getId: "selectedcateg/getId"
    }),
  },
  mounted() {
    // Mounts LocalStorage list
    // this.$store.dispatch("products/loadList", this.data);
  },
  methods: {
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
      console.log(item)
      if(item != undefined) {
        this.showModal = !this.showModal
        this.updatedBreadCrumb.push(item)
        this.data = item
        // console.log(this.updatedBreadCrumb.slice(-1))
        if (this.showModal === true) console.log(this.updatedBreadCrumb)
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
      localCart = JSON.parse(
        localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)
      );
      if(localCart === null && quantity > 0){
        localCart = [];
        localCart.push(item)
        localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(localCart));
        quantity = 0;
        return
      }
      if (quantity === 0) {
        return;
      } else if (localCart.filter((product) => product.id == item.id).length != 0
      ) {
        localCart.filter(
          (product) => product.id === item.id
        )[0].quantity =
          Number(localCart.filter((product) => product.id === item.id)[0]
            .quantity) + quantity;
        localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(localCart)
        );
      } else {
        localCart.push(item);
        localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(localCart)
        );
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

</style>