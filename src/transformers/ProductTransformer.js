import {Product} from "@/models/Product";

export class ProductTransformer {

	static transform({ Attributes, category_id, id, image, price, titleProduct, unit }) {
		return (new Product())
			.setId(id)
			.setImage(image)
			.setPrice(price)
			.setTitle(titleProduct)
			.setUnit(unit)
			.setAttributes(Attributes)
			.setCategoryId(category_id);
	}

	/**
	 * @param {Product} product
	 * @returns {{id}}
	 */
	static reverseTransform(product) {
		return {
			id: product.id,
			image: product.image,
			price: product.price,
			title: product.title,
			unit: product.unit,
			attributes: product.Attributes,
			categoryId: product.category_id,
		};
	}
}