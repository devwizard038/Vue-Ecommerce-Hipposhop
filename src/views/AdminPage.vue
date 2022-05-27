<template>
	<h1>Admin Page</h1>
	<hr />
	<button @click="saveList" class="btn-load">Load Product List</button>

	<div v-if="table != null" class="tabel">
		<table>
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Price</th>
			</tr>
			<!-- Loop and display table -->
			<tr v-for="n in table" :key="n">
				<td>{{ n.id }}</td>
				<td>{{ n.title }}</td>
				<td>{{ n.price }}</td>
			</tr>
		</table>
	</div>

	<h2 v-else>No data in localStorage</h2>
	<!-- Clear LocalStorage initiator -->
	<button v-if="table != null" @click="clearList" class="btn-clear">Clear list</button>
</template>

<script>
import jsonProducts from '../../src/assets/products.json';
import jsonCategory from '../../src/assets/category.json';
import { SHOP_KEY, TABLES } from "@/const";

export default {
	name: 'AdminPage',
	data() {
		return {
			// Transfrom JSON data from string to object
			table: JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`)),
		}
	},
	props: {},
	methods: {
		saveList() {
			// Stores data in LocalStorage
			localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(jsonProducts));
			localStorage.setItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`, JSON.stringify(jsonCategory));

			// List live update
			this.table = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
		},
		clearList() {
			// Clears LocalStorage
			localStorage.clear()
			this.table = null;
		}
	},


}

</script>

<style>
.btn-load {

	background-color: rgb(69, 172, 69);
	font-weight: bold;
	font-size: 0.8rem;
	padding: 0.7rem;
	color: white;
	border: rgb(69, 172, 69);
	border-radius: 0.8rem;
	margin-right: 1rem;
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
	margin-right: 1rem;
	margin-top: 1rem;
}

.btn-clear:hover {
	background-color: rgb(240, 53, 53);
	cursor: pointer;
}

.tabel {
	padding-top: 1rem;
}

table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

td,
th {
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