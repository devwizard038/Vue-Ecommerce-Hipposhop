<template>

	<h3>Categories</h3>
	<ul>
		<!-- Filter Reset -->
		<li class="category-item" :id="0"><a @click="clickId(0); clickedFilter(0);treeOrigins('')">Toate
				produsele</a></li>

		<!-- Category Tree Loop -->
		<li v-for="categ in catTree" :key="categ.id">
			<a class="category-item" :style="{ 'padding-left': categ.position + 'rem' }"
				@click="clickId(categ.id); clickedFilter(categ.id); treeOrigins(categ)" :id="categ.id">
				{{ categ.name }}
			</a>
		</li>
	</ul>

</template>

<script>

export default {
	name: 'CategoryComponent',
	data() {
		return { catTree: [] }
	},
	emits: ['selected','breadCrumb'],
	computed: {
		category() {
			return this.$store.getters["category/getList"];
		},
	},
	mounted() {
		this.$store.dispatch("category/loadList", this.data);
		this.categoryTree(this.category)
	},
	methods: {
		/**
		 * Emits category ID to data property in parent page (HomePage)
		 * @param id
		 */
		clickId(id) {
			this.$emit("selected", id)
		},
		clickedFilter(id) {
			if (document.querySelectorAll('.selected-item').length > 0) {
				document.querySelector('.selected-item').classList.replace('selected-item', 'category-item')
			}
			document.getElementById(id).classList.replace('category-item', 'selected-item')
		},
		// Category Tree Organisation  
		categoryTree(list) {
			let temp = [0];
			for (let i = 0; i < list.length; i++) {
				for (let j = 0; j < list.length; j++) {
					if (Number(list[j].parent_id) === temp[temp.length - 1]) {
						temp.push(Number(list[j].id));
						list[j].position = temp.length - 1;
						this.catTree.push(list[j]);
					} else if (Number(list[j].id) === temp[temp.length - 1]) {
						temp.pop(Number(list[j].id));
					}
				}
			}
		},
		// Tree Origins
		treeOrigins(selected) {
			let list = [selected.name]
			let position = selected.position
			for (let i = 0; i < position-1; i++) {
				let test = this.catTree.filter(n => n.id == selected.parent_id);
				list.unshift(test[0].name)
				selected = test[0];
			}
			list.unshift('Toate Produsele')
			this.$emit("breadCrumb", list);
		}
	}
}



</script>

<style>
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
	color: rgb(255, 92, 16);
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