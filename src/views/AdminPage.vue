<template>
  <div class="adminContainer">
    <div class="title">
      <h1>Admin Page</h1>
      <hr/>
    </div>

    <div class="adminTableContainer">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 500px; width: 100%"
        :columnDefs="columnsDef()"
        :rowData="rowDataData"
        :defaultColDef="this.defaultColDef"
        rowSelection="multiple"
        animateRows="true"
        @cell-value-changed="onCellValueChanged"
      />
<!--      <div class="adminTable"-->
<!--           v-if="table != null">-->
<!--        <table>-->
<!--          <tr>-->
<!--            <th>Id</th>-->
<!--            <th>Title</th>-->
<!--            <th>Price</th>-->
<!--          </tr>-->
<!--          &lt;!&ndash; Loop and display table &ndash;&gt;-->
<!--          <tr-->
<!--            v-for="n in table"-->
<!--            :key="n">-->
<!--            <td>{{ n.id }}</td>-->
<!--            <td>{{ n.title }}</td>-->
<!--            <td>{{ n.price }}</td>-->
<!--          </tr>-->
<!--        </table>-->
<!--      </div>-->
<!--      <h2 v-else>No data in localStorage</h2>-->
    </div>
    <div class="buttons">
      <!-- Clear LocalStorage initiator -->
      <button v-if="table != null" @click="clearList" class="btn-clear">Clear list
      </button>
      <button @click="saveList" class="btn-load">Load Product List</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters,} from "vuex";
import {AgGridVue} from 'ag-grid-vue3'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  name: 'AdminPage',
  components:{
    AgGridVue
  },
  data() {
    return {
      table: [],
      modified:0,
      rowDataData:[],
      defaultColDef:{
        sortable:true,
        filter:true,
        editable:true,
        flex: 1,
        resizable: true,
      }
    }
  },
  computed: {
    ...mapGetters({
      getProducts: "products/getProducts",
      getLocalStorageList:"products/getLocalStorageList"
    }),
    localStorageComputed(){
      this.loadLocal()
      return this.getLocalStorageList;
    }
  },
  mounted() {
    this.loadLocal();
    this.loadProducts();
    this.table = this.getProducts;
    this.rowDataData = this.getLocalStorageList;
  },
  methods: {
    ...mapActions({
      saveProducts: "products/saveProducts",
      loadProducts: "products/loadProducts",
      deleteProducts: "products/deleteProducts",
      saveModifiedProducts:"products/saveModifiedProducts",
      loadLocal:"products/loadLocal",
      saveCategories: "category/saveCategories",
      deleteCategories: "category/deleteCategories",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
    }),
    saveList() {
      console.log(this.rowDataData)
      // Stores data in LocalStorage
      this.saveProducts();
      this.loadProducts();
      this.saveCategories();
      this.loadLocal()

      // List live update
      this.table = this.getProducts;
      this.rowDataData = this.getLocalStorageList;
      console.log(this.rowDataData)
    },
    clearList() {
      // Clears Product List from LocalStorage
      this.deleteProducts();
      this.deleteCategories();
      this.loadCart();

      // Resets Cart List from LocalStorage
      this.updateCart([]);
      this.loadLocal()
      this.table = [];
      this.rowDataData = this.getLocalStorageList;
    },
    /**
     * Create columns heads for table
     * @returns {Array with Objects}
     */
    columnsDef(){
      let locallist = this.getLocalStorageList;
      let field=[]
      if(locallist !== null && locallist.length > 0){
        for (const [key] of Object.entries(locallist[0])) {
          field.push(
            {field:`${key}`,
              valueParser:param => Number(param.newValue) ? Number(param.newValue) : param.newValue,
          })
        }
      }
      return field
    },
    onCellValueChanged(){
      this.saveModifiedProducts(this.rowDataData)
      this.loadProducts()
    }
  },
}

</script>

<style scoped>
.adminContainer {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
        "header" 70px
        "table" 30rem
        "buttons" 90px
        /auto;
}

.title {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-area: header;
}

.adminTableContainer {
  grid-area: table;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.adminTable {
  overflow: auto;
  width: 80%;
}

.buttons {
  grid-area: buttons;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.btn-load {
  background-color: rgb(69, 172, 69);
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.7rem;
  color: white;
  border: rgb(69, 172, 69);
  border-radius: 0.8rem;
  margin-left: 1rem;
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
}

.btn-clear:hover {
  background-color: rgb(240, 53, 53);
  cursor: pointer;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
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