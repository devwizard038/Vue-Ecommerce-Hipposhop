import { Product } from "@/models/Product";

export class ProductTransformer {
  static transform({
    attributes,
    category_id,
    id,
    image,
    price,
    titleProduct,
    unit,
  }) {
    return new Product()
      .setId(id)
      .setImage(image)
      .setPrice(Number(price))
      .setTitle(titleProduct)
      .setUnit(unit)
      .setAttributes(attributes)
      .setCategoryId(category_id)
      .setCategories(category_id);
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
      attributes: product.attributes,
      categoryId: product.category_id,
    };
  }
}
