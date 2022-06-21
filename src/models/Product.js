export class Product {


	// constructor({ Attributes, category_id, id, image, price, title, unit }) {
		// this.Attributes = this.#parseAttributes(Attributes);
		// this._image = image;
		// this._unit = unit;
		// this._Attributes = Attributes;
		// this._category_id = category_id;
		// this._id = id;
		// this._price = price;
		// this._title = title;
	// }

	get Attributes() {
		return this._Attributes;
	}

	setAttributes(value) {
		this._Attributes = this.#parseAttributes(value);
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

//
	// setId(value) {
	// 	this.id = value;
	// 	return this;
	// }
	//
	// setCategory(value) {
	// 	this.category_id = value;
	// 	return this;
	// }
	//
	// setImage(value) {
	// 	this._image = value;
	// 	return this;
	// }
	//
	// setPrice(value) {
	// 	this.price = value;
	// 	return this;
	// }
	//
	// setTitle(value) {
	// 	this.title = value;
	// 	return this;
	// }
	//
	// setUnit(value) {
	// 	this._unit = value;
	// 	return this;
	// }
	//
	// setAttributes(value) {
	// 	this._image = value;
	// 	return this;
	// }

	#parseAttributes(attributesData) {
		let obj = {};
		if (attributesData) {
			console.log(attributesData);
			let attributes = attributesData.matchAll(/(?<name>[a-z]+):(?<value>[^,:]*)/g);
			for (let attr of attributes) {
				obj[attr.groups.name] = attr.groups.value;
			}
		}

		return obj;
	}
}