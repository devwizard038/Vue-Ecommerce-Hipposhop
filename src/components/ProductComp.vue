<template>
  <!-- Formatting for each product card -->
  <div>
    <div class="card">
      <img
          v-if="image === null"
          src="http://www.womens-southerngolfassociation.org/wp-content/uploads/2021/10/Image-Not-Available.png"
          alt="{{ name }}"
      />
      <img v-else :src="image" v-bind:alt="name"/>
      <div class="productName">
        <p @click="toggleModal()">{{ name }}</p>
      </div>
      <div>
        <p>Preț:</p>
        <p>{{ price }} / {{ unit }}</p>
      </div>
      <div>
        <p>Cantitate:</p>
        <input class="cell" type="number" min="0" v-model.number="quantity"/>
      </div>
      <div></div>
      <button @click="addToCart(product,this.quantity)">Add to cart</button>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  props: ["image", "name", "price", "unit", "product", "showModal"],
  emits: ['toggleModal', 'addToCart'],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    ...mapActions({
      loadSelected: "selectedcateg/loadSelected"
    }),
    toggleModal() {
      this.$emit("toggleModal", this.product);
    },
    addToCart(item, quantity) {
      this.loadSelected(item)
      this.$emit('addToCart', item, quantity);
      this.quantity = 0;
    },
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: row;
  min-height: 3rem;
  align-items: flex-start;
  justify-content: flex-start;
  background: #fbf7ec;
  border: 0.2rem solid white;
  padding: 0.5rem;
  font-family: "Open Sans", sans-serif;
}

.card p {
  position: relative;
  display: flex;
  width: 8rem;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 1rem;
}

.card:hover {
  border: 0.1rem solid rgb(255, 92, 16);
}

img {
  width: 8rem;
  height: 6rem;
}

.cell {
  align-items: center;
  width: 2rem;
  border: 0.1rem solid white;
  outline-color: rgb(255, 92, 16);
}

.cell:hover {
  border: 0.1rem solid rgb(255, 92, 16);
}

.productName p:hover {
  font-weight: bold;
  color: rgb(255, 92, 16);
  cursor: pointer;
}
</style>