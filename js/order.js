let cartArr = JSON.parse(localStorage.getItem('cartArr')) ?
  JSON.parse(localStorage.getItem('cartArr')) : [];
let orderInfo = JSON.parse(localStorage.getItem('orderInfo')) ?
  JSON.parse(localStorage.getItem('orderInfo')) : {};

const spanId = document.getElementById('spanId');
const spanFullName = document.getElementById('spanFullName');
const spanPhone = document.getElementById('spanPhone');
const spanEmail = document.getElementById('spanEmail');
const spanAddress = document.getElementById('spanAddress');
const spanDelivery = document.getElementById('spanDelivery');
const pCount = document.getElementById('pCount');
const pizzas = document.querySelector('.pizzas');

spanId.innerHTML = `<strong>ID:</strong> ${new Date().getTime()}`;
spanFullName.innerHTML = `<strong>Заказчик:</strong> ${orderInfo.name} ${orderInfo.surname}`;
spanPhone.innerHTML = `<strong>Телефон:</strong> ${orderInfo.phone}`;
spanEmail.innerHTML = `<strong>Email:</strong> ${orderInfo.email}`;
spanAddress.innerHTML = `<strong>Адрес доставки:</strong> ${orderInfo.city}, ул.${orderInfo.street} ${orderInfo.build}, кв. ${orderInfo.kv}`;
spanDelivery.innerHTML = `<strong>Способ доставки:</strong> ${orderInfo.typeOfDelivery}`;

let allPrice = function () {
  return cartArr.reduce((a, b) => a += b.price, 0)
}
allPrice()

pCount.innerHTML = `<strong>Итого:</strong> ${cartArr.length} шт., к оплате ${allPrice()} грн`;

let showOrder = function () {
  pizzas.innerHTML = "";
  const pizzasInCart = {};

  cartArr.forEach(order => {
    if (pizzasInCart[order.id]) {
      pizzasInCart[order.id].push(order);
    } else {
      pizzasInCart[order.id] = [order];
    }
  });

  Object.values(pizzasInCart).map(orders => {
    const order = orders[0];
    pizzas.innerHTML += `<div class="ordered-pizza">
                         <img class="pizza-img" src="${order.isNew ? '': 'img/'}${order.img}" alt="pizza">
                         <span class="name"><strong>${order.name}</strong></span><br>
                         <span class="count"><strong>Кол-во:</strong> ${orders.length} шт.</span><br>
                         <span><strong>Цена:</strong> ${orders.reduce((a, b) => a += b.price, 0)} грн<span>   
                         </div>`;
  });

};
showOrder()

const toMain = document.getElementById('toMain');

toMain.onclick = function() {
  window.open('index.html', '_self');
  localStorage.setItem('cartArr', JSON.stringify([]));
}