<template>
  <div class="adminContainer">
    <deleteConfirmAdmin
      v-if="showModal"
      :deleteConfirm="deleteConfirm"
    />
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
    <div class="stateError"
         v-if="this.getAdminList.length === 0 && this.getUserList.length === 0"
    >
      <h2>S'il vous plaît télécharger la liste désirée pour l'administration</h2>
    </div>
    <div class="adminTableContainer"
         v-if="this.getAdminList.length > 0 || this.getUserList.length > 0"
    >
      <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 100%; width: 100%"
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
      <button v-if="this.getModifiedItemsList.length > 0 || this.getModifiedUserList.length > 0"
              @click="updateServer()"
              class="btn-server"
      >
        Mettre à jour le serveur
      </button>
      <button v-if="this.getAdminList.length > 0 || this.getUserList.length > 0"
              @click="clearList" class="btn-clear"
      >
        Effacer la liste
      </button>
      <button @click="saveAdminTable()"
              class="btn-load"
              v-if="this.getUserList.length === 0"
      >
        Charger la liste de produits
      </button>
      <button
        @click="loadUserList()"
        class="btn-load"
        v-if="this.getAdminList.length  === 0"
      >
        Charger la liste des utilisateurs
      </button>
    </div>
  </div>

  <!--	<cell-categories-->
  <!--		style="display: none;"-->
  <!--	/>-->
</template>

<script>
import {mapActions, mapGetters,} from "vuex";
import EvenService from "@/Libraries/ServerEvents";
import {AgGridVue} from 'ag-grid-vue3'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import adminCheckCell from "@/components/agGridComponents/adminCheckCell";
import deleteConfirmAdmin from "@/components/agGridComponents/deleteCofirmAdmin";
import cellCategories from "@/components/agGridComponents/cellCategories";

export default {
  name: 'AdminPage',
  components: {
    AgGridVue,
    deleteConfirmAdmin,
    // eslint-disable-next-line vue/no-unused-components
    cellCategories
  },
  data() {
    return {
      defaultColDef: {
        sortable: true,
        filter: true,
        editable: true,
        // flex: 1,
        resizable: true,
      },
      suppressClickEdit: true,
      responseUpdate: false,
      showEditButtons: true,
      showModal: false,
      temp: null,
    }
  },
  computed: {
    ...mapGetters({
      getAdminList: "products/getAdminList",
      getModifiedItemsList: "products/getModifiedItemsList",
      getUserList: "user/getUserList",
      getModifiedUserList: "user/getModifiedUserList"
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
  mounted() {
    this.saveCategories();
  },
  methods: {
    ...mapActions({
      saveModifiedItemsList: "products/saveModifiedItemsList",
      saveAdminTable: "products/saveAdminTable",
      deleteAdminTable: "products/deleteAdminTable",
      updateCart: "cart/updateCart",
      loadUserList: "user/loadUserList",
      deleteUserList: "user/deleteUserList",
      saveModifiedUserList: "user/saveModifiedUserList",
      saveCategories: "category/saveCategories",
    }),
    clearList() {
      this.deleteAdminTable();
      this.deleteUserList();
      this.saveModifiedItemsList([]);
      this.saveModifiedUserList([])
      // Resets Cart List from LocalStorage
      this.updateCart([]);
    },
    /**
     * Create columns heads for table
     * @returns {Array}
     */
    columnsDef() {
      let localList = this.getAdminList.length > 0 ? this.getAdminList : this.getUserList;
      let field = [];
      if (localList !== null && localList.length > 0) {
        Object.keys(localList[0]).forEach(key => {
          if (key === 'admin') {
            field.push({
              editable: false,
              headerName: "Admin",
              field: "admin",
              cellRenderer: adminCheckCell,
              width: 100
            })
            return
          }
          if (key === 'category_id') {
            field.push(
              {
                field: `${key}`,
                editable: true,
                autoHeight: true,
                cellRenderer: "cellCategories",
                flex: 1
              });
          } else if (key === "id" || key === "price") {
            field.push(
              {
                field: `${key}`,
                editable: false,
                width: 80,
                valueParser: param => {
                  return Number(param.newValue)
                }
              }
            );
          } else {
            field.push(
              {
                field: `${key}`,
                editable: key !== 'id',
                flex: 1,
                // wrapText: true,
                // autoHeight: true,
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
            );
          }


        })
        field.push({
          field: 'action',
          headerName: 'Action',
          cellRenderer: this.actionCellRenderer,
          editable: false,
          width: 130
        })
      }
      return field;
    },
    actionCellRenderer(params) {
      let eGui = document.createElement('div');
      let editingCells = params.api.getEditingCells();
      let isCurrentRowEditing = editingCells.some((cell) => {
        return cell.rowIndex === params.node.rowIndex;
      });

      if (isCurrentRowEditing) {
        eGui.innerHTML = `
        <button
          class="action-button update"
          data-action="update"
           style="
          border: none;
          background-color: rgb(69,121,172);
          color: white;
          padding: 0.6rem;
          border-radius: 6px;
          cursor: pointer
          "
          >
               Mise à jour
        </button>
        <button
          class="action-button cancel"
          data-action="cancel"
           style="
          border: none;
          background-color: rgb(194, 34, 34);
          color: white;
          padding: 0.6rem;
          border-radius: 6px;
          cursor: pointer
          "
          >
               Annuler
        </button>
        `;
      } else {
        eGui.innerHTML = `
        <button
          class="action-button edit"
          data-action="edit"
           style="
          border: none;
          background-color: rgb(69, 172, 69);
          color: white;
          padding: 0.6rem;
          border-radius: 6px;
          cursor: pointer
          "
          >
             Éditer
          </button>
        <button
          data-action="delete"
          style="
          border: none;
          background-color: rgb(194, 34, 34);
          color: white;
          padding: 0.6rem;
          border-radius: 6px;
          cursor: pointer
          "
          >
             Effacer
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
      if (this.getAdminList.length > 0) {
        let modifications = this.getModifiedItemsList;
        modifications.push(params.data);
        this.saveModifiedItemsList(modifications);
      }
      if (this.getUserList.length > 0) {
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
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
          });
        }
        /**
         * Delete function for action buttons
         */
        if (action === 'delete') {
          this.temp = params;
          this.showModal = true;
        }
        if (action === 'update') {
          params.api.stopEditing(false);
        }

        if (action === 'cancel') {
          params.api.stopEditing(true);
        }
      }
    },
    deleteConfirm(answer) {
      if (answer) {
        if (this.getUserList.length > 0) {
          EvenService.deleteUser(this.temp.data.id)
            .then(() =>
              this.loadUserList(),
            )
            .catch(err => console.log(err))
        }
        if (this.getAdminList.length > 0) {
          EvenService.deleteProduct(this.temp.data.id)
            .then(() =>
              this.saveAdminTable()
            )
            .catch(err => console.log(err))
        }
        this.showModal = false
      } else this.showModal = false
    },
    updateServer() {
      if (this.getModifiedItemsList.length > 0) {
        EvenService.postJsonProducts(JSON.stringify(this.getModifiedItemsList))
          .then((response) => {
              this.saveModifiedItemsList([]);
              this.responseUpdate = true;
              console.log(response)
            }
          ).catch(error => console.log(error));
      }
      if (this.getModifiedUserList.length > 0) {
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
        "table" auto
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