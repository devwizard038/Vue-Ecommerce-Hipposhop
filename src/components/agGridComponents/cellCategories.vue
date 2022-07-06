<template>
  <selction>
		<div
			v-for="category in getCategories(ids)"
			:key="category"
		>{{ category }}</div>
	</selction>
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
}
</style>