<template>
  <h1>Admin Page</h1>
  <hr/>
  <button @click="saveList" class="btn-load">Load Product List</button>
  <div v-if="table != null" class="tabel">
    <table>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
      </tr>
      <!-- Loop and display table -->
      <tr v-for="n in table" :key="n">
        <td>{{ n.id }}</td>
        <td>{{ n.title }}</td>
        <td>{{ n.price }}</td>
      </tr>
    </table>
  </div>
  <h2 v-else>No data in localStorage</h2>
  <!-- Clear LocalStorage initiator -->
  <button v-if="table != null" @click="clearList" class="btn-clear">Clear list
  </button>
</template>

<script>
import {mapActions, mapGetters,} from "vuex";

export default {
  name: 'AdminPage',
  data() {
    return {
      // Transfrom JSON data from string to object
      table: [],
    }
  },
  computed: {
    ...mapGetters({
      getProducts: "products/getProducts",
    })
  },
  mounted() {
    this.loadProducts();
    this.table = this.getProducts;
  },
  methods: {
    ...mapActions({
      saveProducts: "products/saveProducts",
      loadProducts: "products/loadProducts",
      deleteProducts: "products/deleteProducts",
      saveCategories: "category/saveCategories",
      deleteCategories: "category/deleteCategories",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
    }),
    saveList() {
      // Stores data in LocalStorage
      this.saveProducts();
      this.loadProducts();
      this.saveCategories();

      // List live update
      this.table = this.getProducts;
    },
    clearList() {
      // Clears Product List from LocalStorage
      this.deleteProducts();
      this.deleteCategories();
      this.loadCart();

      // Resets Cart List from LocalStorage
      this.updateCart([]);
      this.table = null;
    }
  },
}

</script>

<style scoped>
.btn-load {

  background-color: rgb(69, 172, 69);
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.7rem;
  color: white;
  border: rgb(69, 172, 69);
  border-radius: 0.8rem;
  margin-right: 1rem;
}

.btn-load:hover {
  background-color: rgb(40, 90, 40);
  cursor: pointer;
}

.btn-clear {
  background-color: rgb(194, 34, 34);
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.7rem;
  color: white;
  border: rgb(69, 172, 69);
  border-radius: 0.8rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

.btn-clear:hover {
  background-color: rgb(240, 53, 53);
  cursor: pointer;
}

.tabel {
  display: inline-block;
  text-align: center;
  padding-top: 1rem;
  overflow-y: auto;
  height: 50vh;
  width: 90vw;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  color: white;
  background-color: gray;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>