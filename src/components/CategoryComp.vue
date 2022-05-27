<template>

    <h3>Categories</h3>
    <ul>
        <!-- Filter Reset -->
        <li class="all-products"><a @click="clickId(0)">Toate produsele</a></li>
        <!-- Loop for iterating over category list and onClick filter -->
        <li class="category-item" v-for="categ in category" :key="categ.id"><a @click="clickId(categ.id)">{{ categ.name }}</a></li>
    </ul>

</template>

<script>

export default {
    name: 'CategoryComponent',
    emits: ['selected'],
    computed: {
        category() {
            return this.$store.getters["category/getList"];
        },
    },
    mounted() {
        this.$store.dispatch("category/loadList", this.data);
    },
    methods: {
			/**
			 * Emits to data property in parent page (HomePage)
			 * @param id
			 */
			clickId(id) {
            this.$emit("selected", id)
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
</style>