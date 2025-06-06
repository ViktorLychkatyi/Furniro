import { Cart } from './cart.js';

export class Product {
  constructor(id, title, subtitle, price, oldPrice, image, discount) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.price = price;
    this.oldPrice = oldPrice;
    this.image = image;
    this.discount = discount;
  }

  render() {
    const a = document.createElement('a');
    a.href = "product.html";

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="image-wrapper">
        <img src="${this.image}">
        <div class="info_product">
          <h3>${this.title}</h3>
          <p>${this.subtitle}</p>
          <p class="discount">${this.discount}%</p>
          <div class="price_row">
            <p class="price">${this.price} USD</p>
            <p class="price_old">${this.oldPrice} USD</p>
          </div>
        </div>
        <div class="overlay">
          <button class="add-to-cart"><h4>Add to cart</h4></button>
        </div>
      </div>
    `;
    a.appendChild(card);
    return a;
  }
}

async function loadProducts() {
  try {
    const res = await fetch('product.json');
    const data = await res.json();

    const container = document.getElementById('cards_products');

    data.forEach(p => {
      const product = new Product(p.id, p.title, p.subtitle, p.price, p.oldPrice, p.image, p.discount);
      const productElement = product.render();

      const button = productElement.querySelector('.add-to-cart');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const cart = new Cart();
        cart.addItem({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          quantity: 1
        });
        alert(`Товар "${p.title}" добавлен в корзину!`);
      });

      container.appendChild(productElement);
    });
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
  }
}

loadProducts();