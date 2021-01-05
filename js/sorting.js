cartArr = JSON.parse(localStorage.getItem('cartArr')) ?
JSON.parse(localStorage.getItem('cartArr')) : [] ;

//Сортировка 

let minPrice = document.getElementById('minPrice');
let maxPrice = document.getElementById('maxPrice');
let sortBtnPrice = document.getElementById('sortBtn1');

let minCal = document.getElementById('minCal');
let maxCal = document.getElementById('maxCal');
let sortBtnCal = document.getElementById('sortBtn2');


const sortByAny = function () {
  let sortedPizzaList = [...pizzaList];
  let min = +minPrice.value;
  let max = +maxPrice.value;
  let minC = +minCal.value;
  let maxC = +maxCal.value;
  if (max) {
    sortedPizzaList = sortedPizzaList.filter(pizza => pizza.price >= min && pizza.price <= max);
  }    // для цены
  if (maxC) {
    sortedPizzaList = sortedPizzaList.filter(pizza => pizza.caloricity >= minC && pizza.caloricity <= maxC)
  }    //для калорий
  filteredPizzaList = sortedPizzaList;
  return showPizzaList();
};




// Счетчик на корзине и добавление пиццы в корзину
let countNumber = document.getElementsByClassName('cart-count')[0];
let count = JSON.parse(localStorage.getItem('cartArr'))
countNumber.innerText = count ? count.length: 0;

let pizzaToCart = function (id) {
  cartArr.push(pizzaList.find(i => i.id === id));
  localStorage.setItem('cartArr', JSON.stringify(cartArr));
  countNumber.innerText = cartArr.length;
};


// Конструктор пиццы
let btnCreate1 = document.getElementById('btnCreate1');

btnCreate1.onclick = function() {
  window.open('constructor.html', '_self');
}






