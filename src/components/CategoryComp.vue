<template>
  <h3>Categories</h3>
  <hr />
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
h3{
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 0;
  margin: 0;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  /*padding-right: 3rem;*/
  /*padding-top: 2rem;*/
  padding-bottom: 2rem;
}

a {
  text-decoration: none;
  cursor: pointer;
}



@media(max-width: 600px){
  h3{
    font-size: 1rem;
  }
}
</style>