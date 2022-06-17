<template>
  <div class="categoryPageContainer">
    <div class="header">
      <h3>Categories</h3>
      <hr/>
    </div>
    <div class="categoriesContainer">
      <!-- Category data organised in a tree -->
      <TreeBrowser
				:node="categoryTree"
      />
    </div>
  </div>
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
      if (categories) {
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
.categoryPageContainer {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
      "header" 50px
      "content" auto
      / auto;
}

.header {
  width: 100%;
  height: 100%;
  grid-area: header;
}

.categoriesContainer {
  height: 100vh;
  width: 100%;
  grid-area: content;
  overflow:auto;
}

.categoriesContainer::-webkit-scrollbar {
  width: 8px;
}

.categoriesContainer::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.categoriesContainer::-webkit-scrollbar-thumb {
  background-color: rgb(16, 191, 255);
  border-radius: 100px;
}

h3 {
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
  padding-bottom: 2rem;
}

a {
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 600px) {
  h3 {
    font-size: 1rem;
  }
}
</style>