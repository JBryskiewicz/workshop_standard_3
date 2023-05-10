const productsElement = document.querySelector('#products');
const ordersElement = document.querySelector('#orders');
const packageElement = document.querySelector('#package');
const selectElements = document.querySelectorAll('.select__dropdown li');
const selectInputElement = packageElement.firstElementChild;
console.log(selectInputElement);

const accountingElement = document.querySelector('#accounting');
const terminalElement = document.querySelector('#terminal');

const productSummary = document.querySelector('[data-id=products]').children;
const orderSummary = document.querySelector('[data-id=orders]').children;
const packageSummary = document.querySelector('[data-id=package]');
const accountingSummary = document.querySelector('[data-id=accounting]');
const terminalSummary = document.querySelector('[data-id=terminal]');

const productPrice = Number(0.5);
const orderPrice = Number(0.25);

class Calculator {
    constructor(quantity, price) {
        this.quantity = quantity;
        this.price = price;
    }

    total() {
        return this.quantity * this.price;
    }
};

const packages = {
    '$10': 'basic',
    '$15': 'professional',
    '$25': 'premium'
};


const numberInputListener = function (collection) {
    let inputValue = this.value;
    let currentPrice = 0;

    if (isNaN(inputValue) === false) {
        (this.id === 'products') ? currentPrice = productPrice : currentPrice = orderPrice;

        const calculator = new Calculator(inputValue, currentPrice);

        collection[1].innerText = `${calculator.quantity} * $${calculator.price}`;
        collection[2].innerText = `$${calculator.total()}`;
        (inputValue.length > 0) ?
            collection[0].parentElement.style.display = 'flex' :
            collection[0].parentElement.style.display = 'none';
    }
};

const checkboxListener = function (element) {
    this.checked ? element.style.display = 'flex' : element.style.display = 'none';
};

const dropdownListener = function () {
    this.classList.toggle("open");
};

const selectListener = function () {
    let value = this.dataset.value;
    selectInputElement.innerText = value;
    Object.entries(packages).forEach(([key, validation]) => {
       if(validation === value) {
           packageSummary.children[1].innerText = value;
           packageSummary.lastElementChild.innerText = key;
       }
    });
    packageSummary.style.display = 'flex';
}

productsElement.addEventListener('change', numberInputListener.bind(productsElement, productSummary));
ordersElement.addEventListener('change', numberInputListener.bind(ordersElement, orderSummary));
packageElement.addEventListener('click', dropdownListener);
selectElements.forEach((e) => e.addEventListener('click', selectListener));
accountingElement.addEventListener('change', checkboxListener.bind(accountingElement, accountingSummary));
terminalElement.addEventListener('change', checkboxListener.bind(terminalElement, terminalSummary));

