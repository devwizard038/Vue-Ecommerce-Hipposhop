<template>
  <h3>Categories</h3>
  <!-- Category data organised in a tree -->
  <TreeBrowser
      :node="categoryTree"
  >
  </TreeBrowser>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import TreeBrowser from "./TreeBrowser"
import {Category} from "@/models/Category";

export default {
  name: "CategoryComponent",
  components: {
    TreeBrowser
  },
  data() {
    return {
      catTree: [],
      categoryTree: [],
    };
  },
  emits: ["selected", "breadCrumb"],
  computed: {
    ...mapGetters({
      getCategories: "category/getCategories",
    })
  },
  mounted() {
    this.loadCategories();
    this.catTree = this.getCategories;
    this.categoryTree = new Category();
    this.mapCategory(this.catTree, this.categoryTree);
  },
  methods: {
    ...mapActions({
      loadCategories: "category/loadCategories",
    }),
    mapCategory(categories, currentNode) {
      if(categories){
        categories.forEach(category => {
          if (currentNode.id === category.parent_id) {
            let child = new Category({
              id: category.id,
              name: category.name
            });
            currentNode.addChild(child);
            this.mapCategory(categories, child);
          }
        });
      } else {
        return categories = null
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  border: 2px solid black;
  padding-right: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.all-products {
  color: rgb(185, 59, 0);
}

.all-products:hover {
  color: 0
}

.category-item {
  color: rgb(0, 0, 0);
}

.category-item:hover {
  color: rgb(255, 92, 16);
}

.category-item:active {
  color: rgb(255, 92, 16);
}

.selected-item {
  color: rgb(255, 92, 16);
}

.-sub {
  padding-left: 1rem;
}
</style>