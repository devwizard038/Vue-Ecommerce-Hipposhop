<template>
    <h1>Admin Page</h1>
    <div>
        <button @click="saveList">Save List</button>
    </div>
</template>

<script>
import json from '../../src/assets/test.json'
console.log(json)

// iterare localStorage
// let tabel = JSON.parse(localStorage.getItem('LOCAL_KEY_CART_products'));
// console.log(tabel)
// for(let i=0; i< tabel.length; i++){
//     console.log(tabel[i].title)
// }

export default {
    name: 'AdminPage',
    props: {},
    methods: {
        saveList() {
            // Functie stocare in Local Storage
            localStorage.setItem('LOCAL_KEY_CART_products', JSON.stringify(json));
        }
    }

}

</script>