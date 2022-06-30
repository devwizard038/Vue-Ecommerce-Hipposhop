<template>
  <div class="adminContainer">
    <transition
      mode="in-out"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <p
        class="popup"
        v-if="this.responseUpdate"
      >
        Server updated
      </p>
    </transition>
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
      <button v-if="this.getModifiedItemsList.length > 0" @click="updateServer()" class="btn-server">Update
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
import EvenService from "@/Libraries/ServerEvents";
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
      defaultColDef: {
        sortable: true,
        filter: true,
        editable: true,
        flex: 1,
        resizable: true,
      },
      responseUpdate: false,
    }
  },
  computed: {
    ...mapGetters({
      getAdminList: "products/getAdminList",
      getModifiedItemsList: "products/getModifiedItemsList"
    }),
  },
  watch: {
    responseUpdate() {
      if (this.responseUpdate) {
        setTimeout(() => {
          this.responseUpdate = false;
        }, 3000)
      }
    }
  },
  methods: {
    ...
      mapActions({
        saveModifedItemsList: "products/saveModifedItemsList",
        saveAdminTable: "products/saveAdminTable",
        deleteAdminTable: "products/deleteAdminTable",
        updateCart: "cart/updateCart",
      }),
    saveList() {
      this.saveAdminTable();
    }
    ,
    clearList() {
      // Clears Product List from LocalStorage
      this.deleteAdminTable();
      this.saveModifedItemsList([]);
      // Resets Cart List from LocalStorage
      this.updateCart([]);
    }
    ,
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
    }
    ,
    /**
     * Confirmed edited data changed
     */
    onCellValueChanged(params) {
      let modifications = this.getModifiedItemsList;
      modifications.push(params.data);
      this.saveModifedItemsList(modifications);
    }
    ,

    updateServer() {
      EvenService.postJsonProducts(JSON.stringify(this.getModifiedItemsList))
        .then((response) => {
            this.saveModifedItemsList([]);
            this.responseUpdate = true;
            console.log(response)
          }
        ).catch(error => console.log(error));
    }
    ,
  }
}

</script>

<style scoped>
.popup {
  position: absolute;
  top: 4rem;
  right: 13rem;
  background-color: rgba(23, 59, 133, 0.8);
  color: #f8f8f8;
  padding: 0.5rem;
  border-radius: 0.7rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  z-index: 10000000;
}

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