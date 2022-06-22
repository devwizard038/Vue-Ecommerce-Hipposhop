<template>
  <div class="product-container">
    <div class="product-details">
      <div class="closeModal">
        <p @click="closeModal()">&#9747;</p>
      </div>
      <div class="image">
        <img
          :src="this.getDetails._image"
          :alt="this.getDetails._title"/>
      </div>
      <div class="modalDetailsContainer">
        <div class="title">
          <h2>{{ this.getDetails.title }}</h2>
        </div>
        <div class="pricingContainer">
          <div class="pricingQty">
            <p>Pret: {{ this.getDetails.price }}/{{ this.getDetails.unit }}</p>
            <div class="qtyContainer">
              <p>Cantitate:
                <input
                  class="cell"
                  type="number"
                  min="0"
                  v-model.number="quantity"/></p>
              <transition
                mode="in-out"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <p
                  v-if="this.validQuantity"
                  class="invalidQty"
                >Selectati o cantitate !</p>
              </transition>
            </div>
          </div>
          <div
            class="variantsContainer"
            v-if="Object.keys(this.getDetails.Attributes).length > 0"
          >
            <p style="text-align: center">Tip</p>
            <div>
              <button
                v-for="items in variantsTypeList"
                @click="loadDetails(items)"
                :class="items.id !== this.getDetails.id
                ? 'variantsBtn' : 'selected'"
                :key="items.Attributes.name"
              >
                {{ items.Attributes.type }}
              </button>
            </div>
            <p style="text-align: center">Marime</p>
            <div>
              <button
                v-for="items in variantsSizeList"
                @click="loadDetails(items)"
                :class="items.id !== this.getDetails.id
                ? 'variantsBtn' : 'selected'"
                :key="items._Attributes.name">
                {{ items._Attributes.size }}
              </button>
            </div>
          </div>
          <button
            class="addBtn"
            @click="addToCart(this.getDetails,this.quantity)">
            ADD TO CART
          </button>
        </div>
        <div class="description">
          <h3>Despre produs</h3>
          <p>i.e., "from the outset," referring to an inquiry or investigation. Ab
            initio mundi means "from the begzzinning of the world." In literature,
            it refers to a story told from the beginning rather than in medias res
            ('from the middle'). In science, it refers to the first principles. In
            other contexts, it often refers to beginner or training courses. In
            law, it refers to a thing being true from its beginning or from the
            instant of the act, rather than from when the court declared it so.
            Likewise, an annulment is a judicial declaration of the invalidity or
            nullity of a marriage ab initio: the so-called marriage was "no thing"
            (Latin: nullius, from which the word "nullity" derives) and never
            existed, except perhaps in name only.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductDetailComponent',
  emits: {
    // null -> No validation needed
    closeModal: null,
    addToCart: null,
  },
  data() {
    return {
      quantity: 0,
      validQuantity: false,
    }
  },
  computed: {
    ...mapGetters({
      getProducts: "products/getProducts",
      getDetails: "productDetail/getDetails"
    }),
    /**
     * Filter TYPE for same SIZE objects
     * @returns {Object}
     */
    variantsTypeList() {
      if (Object.keys(this.getDetails.Attributes).length > 0) {
        return this.getProducts.filter(item =>
          item._Attributes != null
          && item.Attributes.size === this.getDetails.Attributes.size
          && item.Attributes.name === this.getDetails.Attributes.name
        );
      }

      return null;
    },
    /**
     * Filter SIZE for same TYPE objects
     * @returns {Object}
     */
    variantsSizeList() {
      if (Object.keys(this.getDetails.Attributes).length > 0) {
        let variantList = this.getProducts.filter(item =>
          item.Attributes != null
          && item.Attributes.type === this.getDetails.Attributes.type
          && item.Attributes.name === this.getDetails.Attributes.name
        )
        return variantList
      } else return null
    },
  },
  methods: {
    ...mapActions({
      loadDetails: "productDetail/loadDetails",
      loadSelected: "cart/loadSelected"
    }),
    closeModal() {
      this.$emit('closeModal');
    },
    addToCart(item) {
      if (this.quantity > 0) {
        item.showMessage = false;
        item.quantity = this.quantity;
        this.quantity = 0;
        this.loadSelected(item);
        this.validQuantity = false;
        this.$emit('addToCart', item);
      } else {
        this.validQuantity = true;
        setTimeout(() => {
          this.validQuantity = false
        }, 4000)
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";
@import "../assets/css/fontPoppins.css";

.qtyContainer {
  position: relative;
}

.qtyContainer .invalidQty {
  width: 20ch;
  position: absolute;
  font-size: 1rem;
  color: red;
  top: 2rem;
  --animate-duration: 0.4s;
}

.product-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.76);
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.variantsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.selected {
  color: black;
  border: 2px black solid;
  background-color: gray;
  padding: 0.5rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  margin: 0.2rem;
  pointer-events: none;
}

.variantsBtn {
  color: black;
  border: 2px black solid;
  background-color: white;
  padding: 0.5rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  margin: 0.2rem;
  cursor: pointer;
}

.product-details {
  width: 50vw;
  height: auto;
  max-height: 80vh;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: grid;
  grid-template:
      "closeButton" 65px
      "productImage" auto
      "content" auto
      /auto;
  overflow: auto;
}

.product-details::-webkit-scrollbar {
  width: 12px;
}

.product-details::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.product-details::-webkit-scrollbar-thumb {
  background-color: rgb(16, 191, 255);
  border-radius: 100px;
}


.closeModal {
  width: 100%;
  grid-area: closeButton;
  display: flex;
  justify-content: flex-end;
}

.closeModal p {
  margin-right: 1rem;
  padding: 0.2rem;
  color: white;
  background-color: #2095E1FF;
  cursor: pointer;
}

.closeModal p:hover {
  background-color: #0e3756;
}

.image {
  grid-area: productImage;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image img {
  width: auto;
  height: auto;
  max-height: 15rem;
}

.modalDetailsContainer {
  grid-area: content;
  display: grid;
  grid-template:
      "title" 60px
      "pricing" auto
      "description" auto
      /auto;
}

.title {
  width: 100%;
  height: 100%;
  grid-area: title;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pricingContainer {
  grid-area: pricing;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pricingContainer .addBtn {
  background-color: #2095E1FF;
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.pricingContainer .addBtn:hover {
  background-color: rgb(7, 72, 96);
  cursor: pointer;
}

.pricingQty {
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: center;
}

.pricingQty input {
  padding: 0.2rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  width: 2.5rem;
  border-radius: 6px;
  border: 1px solid black;
}

.pricingQty input:hover {
  border: 2px solid #2095E1FF;
}

.pricingQty input:focus {
  border: 2px solid #2095E1FF;
}

.description {
  grid-area: description;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.description h3 {
  text-align: center;
}
</style>