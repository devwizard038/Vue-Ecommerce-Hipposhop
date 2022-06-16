<template>
  <!-- Formatting for each product card -->
  <div class="cardContainer">
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
      <p class="title"><b>Preț:</b>&nbsp; {{ price }} / {{ unit }}</p>
      <p><b>Cantitate:</b> &nbsp;<input class="inputCell" type="number" min="0" v-model.number="quantity"/></p>
      <button class="addToCart" @click="addToCart(product,this.quantity)">Add to cart</button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  props: ["image", "name", "price", "unit", "product", "showModal"],
  emits: ['toggleModal', 'addToCart'],
  data() {
    return {
      quantity: 0,
    };
  },
  computed:{
    ...mapGetters({
      getDetails:"productDetail/getDetails"
    })
  },
  methods: {
    ...mapActions({
      loadDetails:"productDetail/loadDetails",
      loadSelected: "selectedcateg/loadSelected"
    }),
    toggleModal() {
      this.loadDetails(this.product);
      console.log(this.getDetails);
      this.$emit("toggleModal", this.product);
    },
    addToCart(item, quantity) {
      if (quantity > 0) {
        item.showMessage = false
        this.loadSelected(item)
        this.$emit('addToCart', item, quantity);
        this.quantity = 0;
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

.card:hover {
  border: 2px solid #2095E1FF;
}

img {
  width: 10rem;
  height: 7rem;
  border-radius: 4px;
  box-shadow: 4px 2px 2px gray;
}

.inputCell {
  align-items: center;
  width: 3rem;
  /*height: 2rem;*/
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