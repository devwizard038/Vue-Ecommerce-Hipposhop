export class Category {

    /**
     * @type {null|Category}
     */
    parent = null;

    /**
     * @type {[Category]}
     */
    children = [];

    constructor({id, name} = {id: 0, name: "Root"}) {
        this.id = id;
        this.name = name;
    }

    /**
     * @param {Category} child
     */
    addChild(child) {
        this.children.push(child);
        child.parent = this;
    }

    /**
     * @returns {Category[]}
     */
    path() {
        return this.parent && this.parent.id ? this.parent.path().concat([this]) : [this];
    }
}