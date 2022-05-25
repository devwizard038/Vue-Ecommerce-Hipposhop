<template>
<h1>Home Page</h1>

</template>

<script>

export default{
    data(){
        return{
            products: null,
            data:null
        }
    },

    mounted(){
            this.data=this.products
    }

}
</script>