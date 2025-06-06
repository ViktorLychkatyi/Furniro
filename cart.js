export class Cart {
  constructor() {
    this.items = this.loadCartCookie();
  }

  loadCartCookie() {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
      if (c.startsWith('cart=')) {
        try {
          return JSON.parse(decodeURIComponent(c.split('=')[1]));
        } catch {
          return [];
        }
      }
    }
    return [];
  }

  saveCartCookie() {
    const data = encodeURIComponent(JSON.stringify(this.items));
    document.cookie = `cart=${data}; path=/; max-age=86400`;
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.items.push({...product});
    }
    this.saveCartCookie();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCartCookie();
    this.renderCart();
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      return (!isNaN(price) && !isNaN(quantity)) ? sum + price * quantity : sum;
    }, 0);
  }

  renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const subtotalValue = document.getElementById('subtotal');
    const totalValue = document.getElementById('total');

    if (!cartContainer || !subtotalValue || !totalValue) return;

    cartContainer.innerHTML = '';

    if (this.items.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      subtotalValue.textContent = '0.00 USD';
      totalValue.textContent = '0.00 USD';
      return;
    }

    this.items.forEach(item => {
      const row = document.createElement('div');
      row.classList.add('info_cart_product');

      const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
      const validItemTotal = isNaN(itemTotal) ? 0: itemTotal;

      row.innerHTML = `
        <div class="info_basket_picture"><img src="${item.image}" width="100" height="100"></div>
        <p>${item.title || 'Untitled'}</p>
        <p>${parseFloat(item.price).toFixed(2)} USD</p>
        <p>${parseInt(item.quantity)}</p>
        <p>${validItemTotal.toFixed(2)} USD</p>
        <button class="remove-item" data-id="${item.id}"><div><img src="svg/ant-design_delete-filled.svg" alt=""></div></button>
      `;

      cartContainer.appendChild(row);
    });

    const total = this.getTotal();
    const validTotal = isNaN(total) ? 0: total;

    subtotalValue.textContent = `${validTotal.toFixed(2)} USD`;
    totalValue.textContent = `${validTotal.toFixed(2)} USD`;

    const removeButtons = cartContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.removeItem(id);
      });
    });
  }
}

const cart = new Cart();
cart.renderCart();
const container = document.getElementById('cart-items');