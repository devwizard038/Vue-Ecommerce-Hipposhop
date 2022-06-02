<template>
  <div>
    <div class="card">
      <img
        v-if="image === null"
        src="http://www.womens-southerngolfassociation.org/wp-content/uploads/2021/10/Image-Not-Available.png"
        alt="{{ name }}"
      />
      <img v-else :src="image" v-bind:alt="name" />
      <div>
        <p>{{ name }}</p>
      </div>
      <div>
        <p>Preț:</p>
        <p>{{ price }} / {{ unit }}</p>
      </div>

      <div>
        <p>Cantitate:</p>

        <input class="cell" type="number" v-model.number="quantity" />
      </div>
      <div></div>

      <div>
        <button @click="addToCart(product)">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SHOP_KEY, TABLES } from "@/const";

export default {
  props: ["image", "name", "price", "unit", "product"],
  // image: {
  //   type: String,
  //   default: null,
  // },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // unit: {
  //   type: String,
  //   required: true,
  // },
  data() {
    return {
      quantity: 0,
      localCart: [],
    };
  },
  methods: {
    addToCart(product) {
      product.quantity = this.quantity;
      //this.localCart.push(product)
      let cartOld = JSON.parse(
        localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)
      );
      console.log(cartOld);
      if (cartOld != null) {
        cartOld.push(product);
        localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(cartOld)
        );
      } else {
        cartOld = [];
        cartOld.push(product);
        localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(cartOld)
        );
      }

      console.log(localStorage);
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
  border: 0.5rem solid white;
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

img {
  width: 8rem;
  height: 6rem;
}
.cell {
  align-items: center;
  width: 2rem;
}
</style>