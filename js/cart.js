const cartContent = document.getElementsByClassName('cart__content')[0];

let cartArr = JSON.parse(localStorage.getItem('cartArr')) ?
  JSON.parse(localStorage.getItem('cartArr')) : [];

pizzaList = JSON.parse(localStorage.getItem('pizzaList')) ?
  JSON.parse(localStorage.getItem('pizzaList')) : [];


// Подсчет общей стоимости 
let allPrice = function () {
  return cartArr.reduce((a, b) => a += b.price, 0)
}

// Кнопки + и -
let onAdd = function (id) {
  cartArr = JSON.parse(localStorage.getItem('cartArr'));
  cartArr.push(pizzaList.find(pizza => pizza.id === id));
  localStorage.setItem('cartArr', JSON.stringify(cartArr));
  showCart();
};

let onRemove = function (id) {
  cartArr = JSON.parse(localStorage.getItem('cartArr'));
  const index = cartArr.findIndex(i => i.id === id);
  cartArr.splice(index, 1);
  localStorage.setItem('cartArr', JSON.stringify(cartArr));
  showCart();
};


// Корзина
let showCart = function () {
  cartArr = JSON.parse(localStorage.getItem('cartArr'));
  cartContent.innerHTML = "<h2>Ваш заказ:</h2>";
  const pizzas = {};

  cartArr.forEach(order => {
    if (pizzas[order.id]) {
      pizzas[order.id].push(order);
    } else {
      pizzas[order.id] = [order];
    }
  });

  Object.values(pizzas).map(orders => {
    const order = orders[0];
    cartContent.innerHTML += `<div class ="cart_inner">
    <div class="ordered-pizza">
    <div class="pizza-pos">
    <button class="remove" onclick="removeFromCart.call(this)" data-id=${order.id}>&times;</button>
    <img class="pizza-cart-img" src="${order.isNew ? '' : 'img/'}${order.img}" alt="pizza">
    <span>${order.name}<span>
    <div class="quantity">
    <button class="plus-btn btn" onclick="onAdd(${order.id})">+</button>
    <input class="count" type="text" value="${orders.length}">
    <button class="minus-btn btn" onclick="onRemove(${order.id})">-</button>
    </div>
    </div>
    <span>Цена: ${orders.reduce((a, b) => a += b.price, 0)} грн<span>   
    </div>
    </div>`;

  });



  let cartFooter = document.createElement('div');
  cartFooter.innerHTML = `<span class="sumPrice">Итого к оплате: ${allPrice()} грн</span>
                            <div class="cart-buttons">
                            <a href="index.html" class="cart-btn" class="close2">Продолжить покупки</a>
                            <button class="cart-btn" id="btnOrder">Оформить заказ</button>
                            </div>`;
  cartContent.append(cartFooter);

  let btnOrder = document.getElementById('btnOrder');

  btnOrder.onclick = function () {
    window.open('delivery.html', '_self');
  };

  if (!cartArr.length) {
    btnOrder.style.opacity = '0.5';
    btnOrder.disabled = true;
  }
};
showCart()


// Удаление пиццы из корзины
const removeFromCart = function () {
  let cartArr = JSON.parse(localStorage.getItem('cartArr'));
  const index = cartArr.findIndex(i => i.id === +this.dataset.id);
  let pizzasToRemove = cartArr.filter(i => i.id === +this.dataset.id);
  cartArr.splice(index, pizzasToRemove.length);

  localStorage.setItem('cartArr', JSON.stringify(cartArr))

  // Дублируется код из функции showCart

  cartArr = JSON.parse(localStorage.getItem('cartArr'));
  cartContent.innerHTML = "<h2>Ваш заказ:</h2>";
  const pizzas = {};

  cartArr.forEach(order => {
    if (pizzas[order.id]) {
      pizzas[order.id].push(order);
    } else {
      pizzas[order.id] = [order];
    }
  });

  Object.values(pizzas).map(orders => {
    const order = orders[0];
    cartContent.innerHTML += `<div class ="cart_inner">
                              <div class="ordered-pizza">
                              <div class="pizza-pos">
                              <button class="remove" onclick="removeFromCart.call(this)" data-id=${order.id}>&times;</button>
                              <img class="pizza-cart-img" src="${order.isNew ? '' : 'img/'}${order.img}" alt="pizza">
                              <span>${order.name}<span>
                              <div class="quantity">
                              <button class="plus-btn btn" onclick="onAdd(${order.id})">+</button>
                              <input class="count" type="text" value="${orders.length}">
                              <button class="minus-btn btn" onclick="onRemove(${order.id})">-</button>
                              </div>
                              </div>
                              <span>Цена: ${orders.reduce((a, b) => a += b.price, 0)} грн<span>   
                              </div>
                              </div>`;

  });

  let allPrice = function () {
    return cartArr.reduce((a, b) => a += b.price, 0)
  }

  let cartFooter = document.createElement('div');
  cartFooter.innerHTML = `<span class="sumPrice">Итого к оплате: ${allPrice()} грн</span>
                            <div class="cart-buttons">
                            <a href="index.html" class="cart-btn" class="close2">Продолжить покупки</a>
                            <button class="cart-btn" id="btnOrder">Оформить заказ</button>
                            </div>`;
  cartContent.append(cartFooter);

  btnOrder.onclick = function () {
    window.open('delivery.html', '_self');
  };

  if (!cartArr.length) {
    btnOrder.style.opacity = '0.5';
    btnOrder.disabled = true;
  }
};


