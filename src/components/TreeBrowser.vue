<template>
  <div
      :class="{ 'node': node.id }"
  >
    <div
        v-if="node.id"
        :class="{ 'selected': isSelected }"
    >
			<span
          v-if="hasChildren"
          @click="expanded = !expanded"
          class="type"
      >
				{{ expanded ? '&#45;' : '&#43;' }}
			</span>
      <a @click="emitNode(node)">{{ node.name }}</a>
    </div>
    <div v-if="expanded || node.id === 0">
      <TreeBrowser
          v-for="item in node.children"
          :key="item.id"
          :node="item"
      />
    </div>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'TreeBrowser',
  emits: ["emitNode"],
  props: {
    node: Object,
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    ...mapActions({
      loadId: "selectedcateg/loadId",
      loadCategory: "selectedcateg/loadCategory",
    }),
    /*
    * Update selected category Id in selectedcateg.js
    * */
    emitNode(value) {
      this.loadId(value.id);
      this.loadCategory(value);
    },
  },
  computed: {
    ...mapGetters({
      getId: "selectedcateg/getId",
      getCategory: "selectedcateg/getCategory",
    }),

    hasChildren() {
      return this.node.children.length;
    },
    isSelected() {
      let category = this.getCategory;
      return category ? this.node.id === this.getCategory.id : false;
    }
  }
}

</script>
<style scoped>
.node {
  text-align: left;
  font-size: 1.6rem;
  cursor: pointer;
  margin-left: 40px;
  padding-bottom: 0.3rem;
  margin-right: 1rem;
}

.type {
  font-size: 1.4rem;
  color: grey;
}

.type:hover {
  color: orange;
}

.selected {
  background-color: #efefef;
}

@media (max-width: 600px) {
  .node {
    font-size: 0.8rem;
  }
}
</style>