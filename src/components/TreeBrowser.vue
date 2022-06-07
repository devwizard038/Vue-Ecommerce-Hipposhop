<template>
  <div
    :node = node
    @click="expanded = !expanded"
    :style="{'margin-left': `${depth*2}rem`}"
    class="node">
    <span
        v-if="hasChildren"
        class="type"> {{expanded ? '&#45;'  : '&#43;'}}</span>
    <a @click="emitNode(node.id)">{{node.name}}</a>
  </div>
  <div v-if="expanded">
    <TreeBrowser
      v-for="item in node.children"
      :key="item.id"
      :node="item"
      :depth="depth + 1"
    />
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name:'TreeBrowser',
  emits:["emitNode"],
  props:{
    node:Object,
    depth:{
      type:Number,
      default:0,
    }
  },
  data(){
    return{
      expanded:false,
    }
  },
  methods:{
    /*
    * Update selected category Id in selectedcateg.js
    * */
    emitNode(value){
      this.loadId(value)
    },
    ...mapActions({
      loadId: "selectedcateg/loadId"
    })
  },
  computed:{
    hasChildren(){
      console.log(this.node)
      return this.node.children;
    },
    ...mapGetters({
      getId: "selectedcateg/getId"
    })
  }
}

</script>
<style scoped>
.node{
  text-align: left;
  font-size: 1.5rem;
  cursor: pointer;
}

.type{
  font-size: 1.2rem;
  color: grey;
}
.type:hover{
  color: orange;
}

</style>