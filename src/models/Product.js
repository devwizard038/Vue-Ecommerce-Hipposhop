import {CategoriesService} from "@/services/CategoriesService";

export class Product {

	get categories() {
		return CategoriesService.getCategories(this._categories);
	}

	setCategories(value) {
		this._categories = this.#parseCategories(value);
		return this;
	}

	get attributes() {
		return this._attributes;
	}

	setAttributes(value) {
		this._attributes = this.#parseAttributes(value);
		return this;
	}

	get category_id() {
		return this._category_id;
	}

	setCategoryId(value) {
		this._category_id = value;
		return this;
	}

	get id() {
		return this._id;
	}

	setId(value) {
		this._id = value;
		return this;
	}

	get image() {
		return this._image;
	}

	setImage(value) {
		this._image = value;
		return this;
	}

	get price() {
		return this._price;
	}

	setPrice(value) {
		this._price = value;
		return this;
	}

	get title() {
		return this._title;
	}

	setTitle(value) {
		this._title = value;
		return this;
	}

	get unit() {
		return this._unit;
	}

	setUnit(value) {
		this._unit = value;
		return this;
	}

	#parseCategories(data) {
		return data ? data.toString().split(",") : [];
	}

	#parseAttributes(attributesData) {
		let obj = {};
		if (attributesData) {
			let attributes
				= attributesData.matchAll(/(?<name>[a-z]+):(?<value>[^,:]*)/g);
			for (let attr of attributes) {
				obj[attr.groups.name] = attr.groups.value;
			}
		}

		return obj;
	}

	toObject(){
		let pojo = {
			id: this.id,
			image: this.image,
			price: this.price,
			title: this.title,
			unit: this.unit,
			attributes: this.attributes,
			categoryId: this.category_id,
			quantity: this.quantity
		};
		return pojo;
	}
}