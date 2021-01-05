let cartArr = JSON.parse(localStorage.getItem('cartArr')) ?
  JSON.parse(localStorage.getItem('cartArr')) : [];

let orderInfo = JSON.parse(localStorage.getItem('orderInfo')) ?
  JSON.parse(localStorage.getItem('orderInfo')) : {};

const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const deliverySelect = document.getElementById('deliverySelect');
const city = document.getElementById('city');
const street = document.getElementById('street');
const build = document.getElementById('build');
const kv = document.getElementById('kv');


orderInfo = {
  cartArr,
  typeOfDelivery: '',
  city: '',
  street: '',
  build: '',
  kv: '',
};

btnNext.disabled = true;
btnNext.style.opacity= '0.5';

let btnCheck = function() {
  if (city.value.length && street.value.length && build.value.length && kv.value.length && deliverySelect.value.length) {
    btnNext.disabled = false;
    btnNext.style.opacity = "1";
  }  
}

deliverySelect.addEventListener('change', (e) => {
  orderInfo.typeOfDelivery = e.target.value;
  btnCheck()
});

city.addEventListener('input', (e) => {
  orderInfo.city = e.target.value;
  btnCheck()
});

street.addEventListener('input', (e) => {
  orderInfo.street = e.target.value;
  btnCheck()
});

build.addEventListener('input', (e) => {
  orderInfo.build = e.target.value;
  btnCheck()
});

kv.addEventListener('input', (e) => {
  orderInfo.kv = e.target.value;
  btnCheck()
});



btnPrev.onclick = function () {
  localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
  history.back();
}

btnNext.onclick = function () {
  localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
  window.open('client.html', '_self');
}
