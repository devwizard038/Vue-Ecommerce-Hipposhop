<template>
  <div>
		<div
			v-for="category in getCategories(this.ids)"
			:key="category"
		>{{ category }}
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import {CategoriesService} from "@/services/CategoriesService";

export default {
  name: 'cellCategories',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    return {
      ids: props.params ? props.params.value.split(",") : null,
    }
  },
  data: function () {
    return {
    };
  },
  methods: {
		...mapGetters({
			getCategories:"category/getCategories"
		}),
		getCategories(ids) {
			return CategoriesService.getCategories(ids);
		}
	}
}
</script>
<style scoped>
div {
	line-height: 1.7em;
  display: flex;
  flex-direction: column;
}
</style>