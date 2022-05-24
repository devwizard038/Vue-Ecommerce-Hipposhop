<template>
	<h1 class="logo">Admin Page</h1>
	<button @click="saveList" class="btn-load">Load Product List</button>

	<div v-if="table != null" class="tabel">
		<table>
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Price</th>
			</tr>
			<!-- Loop tabel -->
			<tr v-for="n in table" :key="n">
				<td>{{ n.id }}</td>
				<td>{{ n.title }}</td>
				<td>{{ n.price }}</td>
			</tr>
		</table>
	</div>

	<h2 v-else>No data in localStorage</h2>
	<button v-if="table != null" @click="clearList" class="btn-clear">Clear list</button>
</template>

<script>
import json from '../../src/assets/test.json'


export default {
	name: 'AdminPage',
	data() {
		return {
			table: JSON.parse(localStorage.getItem('LOCAL_KEY_CART_products')),
		}
	},
	props: {},
	methods: {
		saveList() {
			// Functie stocare in Local Storage
			localStorage.setItem('LOCAL_KEY_CART_products', JSON.stringify(json));
			this.table = JSON.parse(localStorage.getItem('LOCAL_KEY_CART_products'));
		},
		clearList() {
			localStorage.clear()
			this.table = null;
		}
	},


}

</script>

<style>
.btn-load {
	font-family: Avenir, Helvetica, Arial, sans-serif;
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