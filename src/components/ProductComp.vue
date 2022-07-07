<template>
  <!-- Formatting for each product card -->
  <div class="cardContainer">
    <div class="card">
      <div class="containerImage">
				<img
					v-if="image === null"
					src="../assets/images/no_image_available.jpg"
					alt="{{ name }}"
				/>
				<img
					v-else
					:src="image"
					:alt="name"
				/>
			</div>
			<div class="productItem">
				<div class="containerProduct" @click="toggleModal()">
					<div class="productName">
						{{ name }}
					</div>
					<div>
					<b>Prix:</b>&nbsp; {{ price }} / {{ unit }}
					</div>
				</div>
				<div class="qtyContainer">
					<p>
						<b>Quantité:</b> &nbsp;
						<input
							class="inputCell"
							type="number"
							min="0"
							v-model.number="quantity"
						/>

					</p>
					<span
						v-if="this.validQuantity"
						class="invalidQty"
					>
							Sélectionner une quantité!
						</span>
				</div>
				<div class="addToCartContainer">
					<button
						class="addToCart"
						@click="addToCart(product)"
					>
						Ajouter au panier
					</button>
				</div>
			</div>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

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
      default: Object
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
    addToCart(selectedItem) {
			let item = selectedItem.toObject();
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
  align-items: center;
	border-bottom: solid 1px #dedede;
	min-height: 170px;
}

.card .containerImage {
	width: 200px;
}

.card p {
  display: flex;
  width: 200px;
  justify-content: flex-start;
  align-items: flex-start;
}

img {
  width: 180px;
  height: 150px;
	border: solid 1px #dedede;
	font-size: 10px;
}

.qtyContainer {
}

.inputCell {
  align-items: center;
  width: 3rem;
	border: 1px solid #2095E1FF;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding-left: 5px;
  margin-left: 2px;
  border-radius: 6px;
}

.productItem {
	flex-grow: 2;
	display: flex;
	padding-left: 10px;
	align-items: center;
}

.qtyContainer .invalidQty {
  color: #FF0000FF;
}

.containerProduct {
	width: 100%;
}

.addToCartContainer {
	margin-right: 20px;
	white-space: nowrap;
}

.productName {
  font-weight: bold;
}

.productName:hover {
  color: #2095E1FF;
  cursor: pointer;
}

.addToCart {
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
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
    /*max-font-size: 0.9rem;*/
    /*min-font-size: 0rem;*/
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