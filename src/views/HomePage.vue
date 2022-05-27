<template>
    <h1>Home Page</h1>
    <hr />
    <!-- {{ products }} -->
    <section class="tabel">
        <div>
            <CategoryComp @clickId="categoryId = $event" />
        </div>
        <div>
            <ProductPage :categoryId="categoryId" />
        </div>
    </section>
</template>

<script>

import { SHOP_KEY, TABLES } from "@/const";
import CategoryComp from "@/components/CategoryComp.vue";
import ProductPage from "@/components/ProductPage.vue";


export default {
    data() {
        return {
            categoryId: 0,
        };
    },
    computed: {
        products() {
            return this.$store.getters["products/getList"];
        }
    },
    mounted() {
        let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
        this.$store.dispatch("products/loadList", data);
    },
    components: { CategoryComp, ProductPage }
}
</script>

<style>
.tabel {
    display: flex;
    justify-content: center;
}
</style>