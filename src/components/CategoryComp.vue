<template>
  <div class="categoryPageContainer">
    <div class="headerCategory">
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
import TreeBrowser from "./TreeBrowser"
import {Category} from "@/models/Category";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CategoryComponent",
  components: {
    TreeBrowser
  },
  data() {
    return {
      categoryTree: [],
    };
  },
  emits: ["selected", "breadCrumb"],
	mounted() {
		this.saveCategories().then(() => {
			this.categoryTree = new Category();
			this.mapCategory(this.getCategories(), this.categoryTree);
		});
	},
  methods: {
		...mapActions({
			saveCategories:"category/saveCategories"
		}),
		...mapGetters({
			getCategories:"category/getCategories"
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
        return this.getCategories
      }
    },
  },
};
</script>

<style scoped>
.categoryPageContainer {
  grid-area: leftContent;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
      "headerCategory" 8%
      "contentCategory" 92%
      / 100%;
}

.headerCategory {
  width: 100%;
  height: 100%;
  grid-area: headerCategory;
}

.categoriesContainer {
  height: 100%;
  width: 100%;
  grid-area: contentCategory;
  overflow: auto;
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