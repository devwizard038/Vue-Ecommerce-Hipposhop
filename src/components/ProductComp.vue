<template>
  <!-- Formatting for each product card -->
  <div class="cardContainer">
    <div class="card">
      <img
        v-if="image === null"
        src="../assets/images/no_image_available.jpg"
        alt="{{ name }}"
      />
      <img
        v-else
        :src="image"
        :alt="name"/>
      <div class="containerProduct">
        <p
          class="productName"
          @click="toggleModal()"
        >{{ name }}</p>
      </div>
      <p class="title">
        <b>Preț:</b>&nbsp; {{ price }} / {{ unit }}
      </p>
      <div class="qtyContainer">
        <p>
          <b>Cantitate:</b> &nbsp;
          <input
            class="inputCell"
            type="number"
            min="0"
            v-model.number="quantity"
          />
        </p>
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
      <button
        class="addToCart"
        @click="addToCart(product)"
      >Add to cart
      </button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductComp',
  props: {
    image: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'Nume produs',
    },
    price: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 'buc'
    },
    product: {
      type: Object,
      default: () => {
      }
    },
    showModal: {
      type: Boolean,
      default: false,
    }
  },
  emits: {
    toggleModal: null,
    addToCart: null,
  },
  data() {
    return {
      quantity: 0,
      validQuantity: false,
    };
  },
  computed: {
    ...mapGetters({
      getDetails: "productDetail/getDetails"
    })
  },
  methods: {
    ...mapActions({
      loadDetails: "productDetail/loadDetails",
      loadSelected: "cart/loadSelected"
    }),

    /**
     *
     */
    toggleModal() {
      this.loadDetails(this.product);
      this.$emit("toggleModal", this.product);
    },

    /**
     * Add to selected item to cart
     * @param item {Object}
     */
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

    },
  },
};
</script>

<style scoped>
.cardContainer {
  width: 100%;
  height: auto;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #dedede;
  min-height: 7rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  padding: 0.5rem;
  font-family: 'Poppins', sans-serif;
  flex-wrap: wrap;
  font-size: 1.2rem;
  min-font-size: 0rem;
  border-radius: 0.7rem;
}

.card p {
  display: flex;
  width: 20ch;
  justify-content: flex-start;
  align-items: flex-start;
}

img {
  width: 10rem;
  height: 7rem;
  border-radius: 4px;
  box-shadow: 4px 2px 2px gray;
}

.qtyContainer {
  position: relative;
}

.inputCell {
  align-items: center;
  width: 3rem;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding-left: 5px;
  margin-left: 2px;
  border-radius: 6px;
}

.inputCell:hover {
  border: 2px solid #2095E1FF;
}

.qtyContainer .invalidQty {
  position: absolute;
  font-size: 1rem;
  color: red;
  top: 2rem;
  --animate-duration: 0.4s;
}

.productName {
  font-size: 1.15rem;
  min-font-size: 0;
  font-weight: bold;
}

.productName:hover {
  color: #2095E1FF;
  cursor: pointer;
}

.addToCart {
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.addToCart:hover {
  background-color: rgb(7, 72, 96);
  cursor: pointer;
}

@media (max-width: 700px) {
  .card {
    flex-direction: column;
    min-height: 0rem;
  }

  .productName {
    max-font-size: 0.9rem;
    min-font-size: 0rem;

  }

  .addToCart {
    max-font-size: 0.5rem;
    min-font-size: 0rem;
  }

  .card p {
    font-size: 0.7rem;
  }

  .inputCell {
    font-size: 0.68rem;
    height: 0.6rem;
    width: 2rem;
  }
}
</style>