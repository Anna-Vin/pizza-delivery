let cartArr = JSON.parse(localStorage.getItem('cartArr')) ?
  JSON.parse(localStorage.getItem('cartArr')) : [];
let orderInfo = JSON.parse(localStorage.getItem('orderInfo')) ?
  JSON.parse(localStorage.getItem('orderInfo')) : {};

const btnPrev = document.getElementById('btnPrevC');
const btnNext = document.getElementById('btnNextC');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');


orderInfo = {
  cartArr,
  ...orderInfo,
  name: '',
  surname: '',
  phone: '',
  email: '',
};

btnNext.disabled = true;
btnNext.style.opacity= '0.5';

let btnCheck = function() {
  if (name.value.length && surname.value.length && phone.value.length && email.value.length) {
    btnNext.disabled = false;
    btnNext.style.opacity = "1";
  }  
}

name.addEventListener('input', (e) => {
  orderInfo.name = e.target.value;
  btnCheck()
});

surname.addEventListener('input', (e) => {
  orderInfo.surname = e.target.value;
  btnCheck()
});

phone.addEventListener('input', (e) => {
  orderInfo.phone = e.target.value;
  btnCheck()
});

email.addEventListener('input', (e) => {
  orderInfo.email = e.target.value;
  btnCheck()
});


btnPrev.onclick = function () {
  localStorage.setItem('orderInfo', JSON.stringify({id: `${new Date().getTime()}${orderInfo.name.slice(2,5)}`, ...orderInfo}));
  history.back();
}

btnNext.onclick = function () {
  localStorage.setItem('orderInfo', JSON.stringify({id: `${new Date().getTime()}${orderInfo.name.slice(2,5)}`, ...orderInfo}));
  window.open('order.html', '_self');
}
