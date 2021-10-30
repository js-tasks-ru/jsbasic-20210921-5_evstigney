export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

	get cart () {
		return this;
	}

  addProduct (product) {
		product = product ?? null;

		if (!product) return;

		const index = this.cartItems.findIndex((item) => item.product.id === product.id);

		if (index >= 0) {
			this.cartItems[index].count += 1;
		} else { 
			this.cartItems.push({product: product, count: 1});
		}
		
		this.onProductUpdate(this);
		//return this;
  }

  updateProductCount (productId, amount) {
		amount = amount ?? 0;
    const index = this.cartItems.findIndex((item) => item.product.id === productId);
		this.cartItems[index].count += +amount;

		if (this.cartItems[index].count === 0) this.cartItems.splice(index, 1);

		this.onProductUpdate(this);
		//return this;
  }

  isEmpty () {
    for (let item of this.cartItems) { if (item) return false; }
		return true;
  }

  getTotalCount () {
    let totalCount = 0;

		for (let item of this.cartItems) {
			totalCount += item.count;
		}

		return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

		for (let item of this.cartItems) {
			totalPrice += item.product.price * item.count;
		}

		return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this.cart);
  }

}

