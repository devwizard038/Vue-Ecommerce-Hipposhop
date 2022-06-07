<template>
    <h1>Home Page</h1>

    <hr />
    <!-- {{ products }} -->
    <section class="tabel">
        <div>
            <CategoryComp @selected="getSelectedCategory" @breadCrumb="getBreadCrumb" />
        </div>
        <div>
            <ProductPage :categoryId="categoryId" :breadCrumb="breadCrumb" @breadCrumbSelect="breadCrumbSelect" />
        </div>
    </section>
</template>

<script>
import { SHOP_KEY, TABLES } from "@/const";
import CategoryComp from "@/components/CategoryComp.vue";
import ProductPage from "@/components/ProductPage.vue";
import {mapGetters} from "vuex";


export default {
    components: { CategoryComp, ProductPage },
    data() {
        return {
            categoryId: 0,
            breadCrumb: [{ id: 0, name: 'Toate Produsele' }],
        };
    },
    computed: {
        products() {
            return this.$store.getters["products/getList"];
        },
        ...mapGetters({
            getId: "selectedcateg/getId"
        }),
        id(){
          return this.getId
        }
    },
    watch:{
        id(newId){
          this.getSelectedCategory(newId)
        }
    },
    mounted() {
        let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
        this.$store.dispatch("products/loadList", data);
        if (localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`)===null){
            localStorage.setItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`, "[]")
        } 
        if (localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`)===null){
            localStorage.setItem(`${SHOP_KEY}-${TABLES.CART}`, "[]")
        }
    },
    methods: {
        /**
         * Catch selected category id
         * @param {Integer} id
         */
        getSelectedCategory(id) {
            this.categoryId = Number(id);
        },
        getBreadCrumb(list) {
            this.breadCrumb = list;
        },
        breadCrumbSelect(item) {
            this.categoryId = Number(item.id);
            let index = this.breadCrumb.indexOf(item)
            this.breadCrumb = this.breadCrumb.slice(0, index + 1)
        }
    }

}
</script>

<style scoped>
.tabel {
    display: flex;
    justify-content: center;
}
</style>