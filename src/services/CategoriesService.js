import store from "../store";

class CategoriesService {

	categoriesList = {};

	constructor() {
		this.categoriesList = new Proxy({}, {
			get(target, prop) {

				if (!target[prop]) {
					target[prop] = store.getters["category/getCategories"]
						.find(category => Number(category.id) === Number(prop))
						.name;
				}
				return target[prop];
			}
		});
	}
	getCategories(data) {
		return data.map(categoryId => {
			return this.categoriesList[categoryId];
		});
	}
}


let instance = new CategoriesService();
Object.freeze(instance);

export { instance as CategoriesService };