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
      <div class="containerProduct">
        <p class="productName" @click="toggleModal()">{{ name }}</p>
      </div>
        <p class="title"><b>Preț:</b> {{ price }} / {{ unit }}</p>
        <p><b>Cantitate:</b><input class="cell" type="number" min="0" v-model.number="quantity"/></p>
      <button class="addToCart" @click="addToCart(product,this.quantity)">Add to cart</button>
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
      if(quantity > 0){
      this.loadSelected(item)
      this.$emit('addToCart', item, quantity);
      this.quantity = 0;}
    },
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: row;
  min-height: 7rem;
  align-items: center;
  justify-content: center;
  background: #dedede;
  border: 0.2rem solid white;
  padding: 0.5rem;
  font-family: 'Poppins', sans-serif;
  flex-wrap: wrap;
  font-size: 1rem;
  min-font-size: 0rem;
  border-radius: 0.7rem;
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
  border: 2px solid #2095E1FF;
}

img {
  width: 8rem;
  height: 6rem;
}

.cell {
  align-items: center;
  width: 2rem;
  border: none;
  font-family: 'Poppins', sans-serif;
  padding-left: 5px;
  margin-left: 2px;
  border-radius: 6px;
}

.cell:hover {
  border: 2px solid #2095E1FF;
}

.productName{
  /*margin-top: 30%;*/
  font-size: 1.15rem;
  min-font-size: 0;
  font-weight: bold;
}

.productName:hover {
  font-weight: bold;
  color: #2095E1FF;
  cursor: pointer;
}
.addToCart{
  background-color: rgb(16, 191, 255);
  padding: 0.6rem;
  font-size: 0.7rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  text-decoration: none;
}

.addToCart:hover{
  background-color: rgb(7, 72, 96);
  cursor: pointer;
}
@media(max-width: 700px){
  .card{
    flex-direction: column;
    min-height: 0rem;
  }
  .productName{
    font-size: 0.9rem;
  }
  .addToCart{
    font-size: 0.5rem;
  }
  .card p{
    font-size: 0.7rem;
  }
  .cell{
    font-size: 0.68rem;
    height: 0.6rem;
    width: 2rem;
  }
}
</style>