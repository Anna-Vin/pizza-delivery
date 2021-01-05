

class createPizzaModel {
  constructor({ img, name, composition, price, caloricity }) {
    this.id = pizzaList.length + 1;
    this.img = img;
    this.name = '';
    this.composition = [];
    this.price = price;
    this.caloricity = caloricity;
    this.isNew = true;
    this.getName(name)
    this.getCompositionsAsName(composition)
  }

  getName(name) {
    name = name.toLowerCase().split('');
    name[0] = name[0].toUpperCase();
    this.name = name.join('')
  }

  getCompositionsAsName(compositions) {
    this.composition = compositionList.filter(el => {
      return compositions.includes(el.id)
    }).map(el => el.name);
  }
}

const pizzaModel = {
  img: '',
  name: '',
  composition: [],
  price: 0,
  caloricity: 0,
}


const addTitle = document.getElementById('addTitle');

addTitle.addEventListener('input', (e) => {
  pizzaModel.name = e.target.value;
  if (!pizzaModel.price || !pizzaModel.name) {
    btnCreate.disabled = true;
    btnCreate.style.opacity = '0.5';
  } else {
    btnCreate.disabled = false;
    btnCreate.style.opacity = '1';
  }
});

const compositionsContainer = document.querySelector('.compositions');
const infoContainer = document.querySelector('.info');
const btnCreate = document.getElementById('btnCreate');
const addImg = document.getElementById('addImg');
const imageView = document.getElementById('imageView');

if (!pizzaModel.price) {
  btnCreate.disabled = true;
  btnCreate.style.opacity = '0.5';
}

const renderInfo = function (caloricity, price) {
  infoContainer.innerHTML = `<h1>Цена: ${price || 0} грн</h1>
                             <p>Калорийность: ${caloricity || 0} ккал</p>`
};
renderInfo()
compositionList.forEach(item => {
  const labelElem = document.createElement('label');
  labelElem.classList.add('constructor_label');
  labelElem.innerText = item.name;
  labelElem.htmlFor = 'composition' + item.id;

  const compositionElem = document.createElement('input');
  compositionElem.id = 'composition' + item.id;
  compositionElem.type = 'checkbox';

  compositionElem.addEventListener('change', function () {
    let composition = pizzaModel.composition;

    if (this.checked) {
      pizzaModel.composition.push(item.id)
    } else {
      pizzaModel.composition = composition.filter(composId => composId !== item.id)
    }

    pizzaModel.price = pizzaModel.composition.length ? 100 : 0;
    pizzaModel.caloricity = pizzaModel.composition.length ? 1000 : 0;

    pizzaModel.composition.forEach(composId => {
      pizzaModel.price += compositionList.find(el => el.id === composId).price;
    });

    pizzaModel.composition.forEach(composId => {
      pizzaModel.caloricity += compositionList.find(el => el.id === composId).caloricity;
    });

    if (!pizzaModel.price || !pizzaModel.name) {
      btnCreate.disabled = true;
      btnCreate.style.opacity = '0.5';
    } else {
      btnCreate.disabled = false;
      btnCreate.style.opacity = '1';
    }
    renderInfo(pizzaModel.caloricity, pizzaModel.price)
  });


  compositionsContainer.append(labelElem);
  compositionsContainer.append(compositionElem);
});





addImg.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    imageView.src = fileReader.result;
    pizzaModel.img = fileReader.result;
  }
  fileReader.readAsDataURL(file);
})

btnCreate.onclick = function () {
  let pizza = new createPizzaModel(pizzaModel);
  let pizzasFromStotage = JSON.parse(localStorage.getItem('newPizzas'));
  pizzasFromStotage = pizzasFromStotage ? pizzasFromStotage : [];
  pizzasFromStotage.push(pizza);
  alert('Пицца создана успешно! Найдите ее на главной странице')
  localStorage.setItem('newPizzas', JSON.stringify(pizzasFromStotage));
  window.open('index.html', '_self')
}


const toStart = document.getElementById('toStart');
toStart.onclick = function () {
  window.open('index.html', '_self')
}