<template>
  <div class="adminContainer">
    <div class="title">
      <h1>Admin Page</h1>
      <hr/>
    </div>
    <div class="stateError" v-if="this.getAdminList.length === 0">
      <h2>Please download list for the administrator</h2>
    </div>
    <div class="adminTableContainer" v-if="this.getAdminList.length > 0">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 500px; width: 100%"
        :columnDefs="columnsDef()"
        :rowData="this.getAdminList"
        :defaultColDef="this.defaultColDef"
        rowSelection="multiple"
        animateRows="true"
        @cell-value-changed="onCellValueChanged"
      />
    </div>
    <div class="buttons">
      <!-- Clear LocalStorage initiator -->
      <button v-if="this.modified && this.getAdminList.length > 0" @click="updateServer()" class="btn-server">Update
        Server
      </button>
      <button v-if="this.getAdminList.length > 0" @click="clearList" class="btn-clear">Clear list
      </button>
      <button @click="saveList" class="btn-load">Load Product List</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters,} from "vuex";
import EvenService from "@/services/EvenService";
import {AgGridVue} from 'ag-grid-vue3'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  name: 'AdminPage',
  components: {
    AgGridVue
  },
  data() {
    return {
      modified: false,
      defaultColDef: {
        sortable: true,
        filter: true,
        editable: true,
        flex: 1,
        resizable: true,
      }
    }
  },
  computed: {
    ...mapGetters({
      getProducts: "products/getProducts",
      getAdminList: "products/getAdminList",
    }),
  },
  methods: {
    ...mapActions({
      saveProducts: "products/saveProducts",
      loadProducts: "products/loadProducts",
      deleteProducts: "products/deleteProducts",
      saveModifiedProducts: "products/saveModifiedProducts",
      saveAdminTable: "products/saveAdminTable",
      deleteAdminTable: "products/deleteAdminTable",
      loadLocal: "products/loadLocal",
      saveCategories: "category/saveCategories",
      deleteCategories: "category/deleteCategories",
      loadCart: "cart/loadCart",
      updateCart: "cart/updateCart",
    }),
    saveList() {
      this.saveAdminTable();
      console.log(this.getAdminList)
      this.saveCategories();
    },
    clearList() {
      // Clears Product List from LocalStorage
      this.modified = false;
      this.deleteAdminTable();
      // this.deleteCategories();
      // this.loadCart();

      // Resets Cart List from LocalStorage
      this.updateCart([]);
      // this.loadLocal()
    },
    /**
     * Create columns heads for table
     * @returns {Array}
     */
    columnsDef() {
      let locallist = this.getAdminList;
      let field = []
      if (locallist !== null && locallist.length > 0) {
        Object.keys(locallist[0]).forEach(key => {
          field.push(
            {
              field: `${key}`,
              wrapText: true,
              autoHeight: true,
              valueParser: param => Number(param.newValue) ? Number(param.newValue) : param.newValue,
              cellRenderer: (param) => {
                if (key === 'image') {
                  if (param.data[key] !== null) {
                    return `<image style="height: 80px; width: 100px" src=${param.data[key]} />`;
                  } else return 'NU AVEM POZA !'
                }
                return param.data[key]
              }
            }
          )
        })
      }
      return field
    },
    /**
     * Confirmed edited data changed
     */
    onCellValueChanged() {
      this.modified = true;
    },
    updateServer() {
      EvenService.postJsonProducts(this.getAdminList)
        .then((response) => {
            console.log(response)
            this.modified = false;
          }
        ).catch(error => console.log(error));
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

.btn-server {
  background-color: rgb(34, 85, 194);
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.7rem;
  color: white;
  border: rgb(69, 172, 69);
  border-radius: 0.8rem;
  margin-right: 1rem;
}

.btn-server:hover {
  background-color: rgb(21, 58, 136);
  cursor: pointer;
}

.stateError {
  padding-top: 8rem;
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 100%;
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