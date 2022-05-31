<template>
    <h1>Home Page</h1>
    
    <hr />
    <!-- {{ products }} -->
    <section class="tabel">
        <div>
            <CategoryComp @selected="getSelectedCategory" @breadCrumb="getBreadCrumb" />
        </div>
        <div>
            <ProductPage :categoryId="categoryId" :breadCrumb="breadCrumb"/>
        </div>
    </section>
</template>

<script>
import { SHOP_KEY, TABLES } from "@/const";
import CategoryComp from "@/components/CategoryComp.vue";
import ProductPage from "@/components/ProductPage.vue";

export default {
    components: { CategoryComp, ProductPage },
    data() {
        return {
            categoryId: 0,
            breadCrumb: ['Toate Produsele'],
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
		methods: {
			/**
			 * Catch selected category id
			 * @param {Integer} id
			 */
			getSelectedCategory(id) {
				this.categoryId = Number(id);
			},
            getBreadCrumb(list){
                this.breadCrumb = list;
            }

		}

}
</script>

<style>
.tabel {
    display: flex;
    justify-content: center;
}
</style>