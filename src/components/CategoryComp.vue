<template>

	<h3>Categories</h3>
<!--De adaugat recursiune pentru category-->
  <TreeBrowser
    :node="categoryTree"
  ></TreeBrowser>
</template>

<script>
import TreeBrowser from "./TreeBrowser"

export default {
	name: "CategoryComponent",
  components:{
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
		category() {
			return this.$store.getters["category/getList"];
		},
	},
	mounted() {
		this.$store.dispatch("category/loadList", this.data);
		/*
		* Obs : Posibil sa trebuiasca un computed ca sa nu fie chemata functia de fiecare data cand isi ia mount.
		* */
    this.mapCategory(this.category)
	},
	methods: {
    /*
    * Function: Process JSON Category data into a Tree like object.
    * Result: JSON Object in Tree Structure with nested components.
    * */
    mapCategory(category){
      const map = category.reduce((prev,current,index)=>{
        prev[current.id] = index;
        return prev;
      },{})

      let root;

      category.forEach((el)=>{
        if(el.parent_id === null){
          root = el;
          return
        }
        const parentEl = category[map[el.parent_id]];

        parentEl.children = [...(parentEl.children || []), el];
      })
      this.categoryTree = root;
    }

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