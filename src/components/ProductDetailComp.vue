<template>
  <div class="product-container">
    <div class="product-details">
      <div class="image">
        <img :src="data.image" :alt="data.title"/>
        <p @click="closeModal()">&#9747;</p>
      </div>
      <div class="details">
        <h2>{{ data.title }}</h2>
        <p>Pret:{{ data.price }}/{{ data.unit }}</p>
        <p>Cantitate:
          <input
              class="cell"
              type="number"
              min="0"
              v-model.number="quantity"/></p>
        <button @click="addToCart(data,this.quantity)">
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
</template>

<script>

import {mapActions} from "vuex";

export default {
  props: ['data'],
  emits: ['closeModal', 'addToCart'],
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    ...mapActions({
      loadSelected: "selectedcateg/loadSelected"
    }),
    closeModal() {
      this.$emit('closeModal');
    },
    addToCart(item, quantity) {
      this.loadSelected(item);
      this.$emit('addToCart', item, quantity);
      this.quantity = 0;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.product-container {
  padding-left: 0.5rem;
  position: absolute;
  z-index: 999;
  background-color: white;
  word-spacing: 0.1rem;
  padding-block: 0.4rem;
  overflow: auto;
  overflow-y: auto;
  height: 50vh;
  max-width: 45vw;
  width: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 2rem;
}

.image img {
  width: auto;
  height: auto;
  max-height: 8rem;
}

.image p {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.08rem;
  margin-right: 1rem;
  border: 2px solid red;
  color: black;
  cursor: pointer;
}

.image p:hover {
  background-color: red;
  color: white;
}

.product-container::-webkit-scrollbar {
  width: 16px;
}

.product-container::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.product-container::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}


.details {
  display: flex;
  flex-direction: column;
}

.details p {
  align-self: flex-start;
  flex-direction: row;
}

.details input {
  border: 1px solid black;
  border-radius: 6px;
}

.details button {
  align-self: center;
  border: none;
  background-color: rgb(255, 92, 16);
  color: white;
  /* font-weight: bold; */
  padding: 1rem;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
}

.details button:hover {
  background-color: rgb(194, 63, 2);;
}

.details button {
  align-self: center;
  border: none;
  background-color: rgb(255, 92, 16);
  color: white;
  /* font-weight: bold; */
  padding: 1rem;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;

}

.description {
  display: flex;
  flex-direction: column;
}

.description p {
  align-self: flex-start;
  flex-direction: row;
}

</style>