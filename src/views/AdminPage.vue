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
        Serveur mis à jour !
      </p>
    </transition>
    <div class="title">
      <h1>Admin Page</h1>
      <hr/>
    </div>
    <div class="stateError" v-if="this.getAdminList.length === 0 && this.getUserList.length === 0">
      <h2>Please download list for the administrator</h2>
    </div>
    <div class="adminTableContainer" v-if="this.getAdminList.length > 0 || this.getUserList.length > 0">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 500px; width: 100%"
        :columnDefs="columnsDef()"
        :rowData="this.getAdminList.length > 0 ? this.getAdminList : this.getUserList"
        :defaultColDef="this.defaultColDef"
        :suppressClickEdit="this.suppressClickEdit"
        rowSelection="multiple"
        animateRows="true"
        editType="fullRow"
        @cell-value-changed="onCellValueChanged"
        @row-editing-started="onRowEditingStarted"
        @row-editing-stopped="onRowEditingStopped"
        @cell-clicked="onCellClicked"
      />
    </div>
    <div class="buttons">
      <button v-if="this.getModifiedItemsList.length > 0 || this.getModifiedUserList.length > 0" @click="updateServer()" class="btn-server">Update
        Server
      </button>
      <button v-if="this.getAdminList.length > 0 || this.getUserList.length > 0" @click="clearList" class="btn-clear">Clear list
      </button>
      <button @click="saveAdminTable()" class="btn-load" v-if="this.getUserList.length === 0">Load Product List</button>
      <button @click="loadUserList()" class="btn-load" v-if="this.getAdminList.length  === 0">Load User List</button>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters,} from "vuex";
import EvenService from "@/Libraries/ServerEvents";
import {AgGridVue} from 'ag-grid-vue3'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import adminCheckCell from "@/components/agGridComponents/adminCheckCell";

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
      suppressClickEdit:true,
      responseUpdate: false,
      showEditButtons: true,
    }
  },
  computed: {
    ...mapGetters({
      getAdminList: "products/getAdminList",
      getModifiedItemsList: "products/getModifiedItemsList",
      getUserList:"user/getUserList",
      getModifiedUserList:"user/getModifiedUserList"
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
        loadUserList:"user/loadUserList",
        deleteUserList:"user/deleteUserList",
        saveModifiedUserList:"user/saveModifiedUserList",
      }),
    clearList() {
      // Clears Product List from LocalStorage
      this.deleteAdminTable();
      this.deleteUserList();
      this.saveModifedItemsList([]);
      this.saveModifiedUserList([])
      // Resets Cart List from LocalStorage
      this.updateCart([]);
    },
    /**
     * Create columns heads for table
     * @returns {Array}
     */
    columnsDef() {
      let locallist = this.getAdminList.length > 0 ? this.getAdminList : this.getUserList;
      let field = []
      if (locallist !== null && locallist.length > 0) {
        Object.keys(locallist[0]).forEach(key => {
          if(key==='admin'){
            field.push( {
              editable: false,
              headerName: "Admin",
              field: "admin",
              cellRenderer: adminCheckCell
            })
            return
          }
          field.push(
            {
              field: `${key}`,
              wrapText: true,
              autoHeight: true,
              valueParser: param => {
                return Number(param.newValue) ? Number(param.newValue) : param.newValue
              },
              cellRenderer: (param) => {
                if (key === 'image') {
                  if (param.data[key] !== null) {
                    return `<image style="height: 80px; width: 100px" src=${param.data[key]} />`;
                  } else return 'No photo !'
                }
                return param.data[key]
              },
            }
          )
        })
        field.push({
          field:'action',
          headerName:'Action',
          cellRenderer:this.actionCellRenderer,
          editable:false,
        })
      }
      return field
    },
    actionCellRenderer(params){
      let eGui = document.createElement('div');
      let editingCells = params.api.getEditingCells();
      let isCurrentRowEditing = editingCells.some((cell) => {
        return cell.rowIndex === params.node.rowIndex;
      });

      if (isCurrentRowEditing) {
        eGui.innerHTML = `
        <button
          class="action-button update"
          data-action="update">
               Update
        </button>
        <button
          class="action-button cancel"
          data-action="cancel">
               Cancel
        </button>
        `;
      } else {
        eGui.innerHTML = `
        <button
          class="action-button edit"
          data-action="edit">
             Edit
          </button>
        <button
          class="action-button delete"
          data-action="delete"
          >
             Delete
        </button>
        `;
      }

      return eGui;
    },
    onRowEditingStarted: (params) => {
      params.api.refreshCells({
        columns: ['action'],
        rowNodes: [params.node],
        force: true,
      });
    },
    onRowEditingStopped: (params) => {
      params.api.refreshCells({
        columns: ['action'],
        rowNodes: [params.node],
        force: true,
      });
    },
    /**
     * Confirmed edited data changed
     */
    onCellValueChanged(params) {
      if(this.getAdminList.length > 0){
        let modifications = this.getModifiedItemsList;
        modifications.push(params.data);
        this.saveModifedItemsList(modifications);}
      if(this.getUserList.length > 0){
        let modifications = this.getModifiedUserList;
        modifications.push(params.data);
        this.saveModifiedUserList(modifications)
      }
    },
    onCellClicked(params) {
      // Handle click event for action cells
      if (
        params.column.colId === 'action' &&
        params.event.target.dataset.action
      ) {
        let action = params.event.target.dataset.action;
        if (action === 'edit') {
          console.log(params.columnApi)
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
          });
        }
        /**
         * Delete function for action buttons
         */
        if (action === 'delete') {
          if(this.getUserList.length > 0){
            EvenService.deleteUser(params.data.id)
              .then(() =>
                params.api.applyTransaction({
                  remove: [params.node.data],
                }))
              .catch(err => console.log(err))
           }
          if(this.getAdminList.length > 0) {
            EvenService.deleteProduct(params.data.id)
              .then(() =>
                params.api.applyTransaction({
                  remove: [params.node.data],
                }))
              .catch(err => console.log(err))
          }
          }
        if (action === 'update') {
          params.api.stopEditing(false);
        }

        if (action === 'cancel') {
          params.api.stopEditing(true);
        }
      }
    },
    updateServer() {
      if(this.getModifiedItemsList.length > 0){
        EvenService.postJsonProducts(JSON.stringify(this.getModifiedItemsList))
          .then((response) => {
              this.saveModifedItemsList([]);
              this.responseUpdate = true;
              console.log(response)
            }
          ).catch(error => console.log(error));
      }
      if(this.getModifiedUserList.length > 0){
        EvenService.postNewUser(JSON.stringify(this.getModifiedUserList))
          .then((response) => {
              this.saveModifiedUserList([]);
              this.responseUpdate = true;
              console.log(response)
            }
          ).catch(error => console.log(error));
      }
    }
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

.action-button {
  padding: 20rem
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