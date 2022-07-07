<template>
  <div
    :class="{ 'node': node.id }"
  >
    <div
      v-if="node.id"
      :class="{ 'selected': isSelected }"
    >
      <a @click="emitNode(node);">
				<div
					style="display: inline-block;"
					v-if="hasChildren"
					:class="{ 'expanded': expanded }"
				>
					&gt;
				</div>
				{{ node.name }}
			</a>
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
  computed: {
    ...mapGetters({
      getCategory: "selectedcateg/getCategory",
    }),

    hasChildren() {
      return this.node.children.length;
    },
    isSelected() {
      let category = this.getCategory;
      return category ? this.node.id === this.getCategory.id : false;
    }
  },
  methods: {
    ...mapActions({
      loadId: "selectedcateg/loadId",
      loadCategory: "selectedcateg/loadCategory",
    }),
    /*
    * Update selected category ID in selectedcateg.js
    * */
    emitNode(value) {
			this.expanded = !this.expanded;
      this.loadId(value.id);
      this.loadCategory(value);
    },
  },
}

</script>
<style scoped>
.node {
  text-align: left;
  cursor: pointer;
  margin-left: 30px;
	color: #6c6c6c;
}

.node a {
	padding: 10px;
	display: block;
	transition: 0.3s;
}

.node a:hover, .selected {
	background-image: linear-gradient(to right, #efefef, #ffffff);
	color: #000;
}

.type {
  font-size: 1.4rem;
  color: grey;
	transition: 0.5s;
}

.expanded {
	-webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	-o-transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	transform: rotate(90deg);
	transition: 0.7s;
}

@media (max-width: 600px) {
  .node {
    font-size: 0.8rem;
  }
}
</style>