<template>
	<h1>Admin Page</h1>
	<div>
		<button @click="saveList">Save List</button>
		<button @click="clearList">Clear list</button>
	</div>

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