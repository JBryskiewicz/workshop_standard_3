const productsElement = document.querySelector('#products');
const ordersElement = document.querySelector('#orders');
const packageElement = document.querySelector('#package');
const selectElements = document.querySelectorAll('.select__dropdown li');
const selectInputElement = packageElement.firstElementChild;
const accountingElement = document.querySelector('#accounting');
const terminalElement = document.querySelector('#terminal');

const productSummary = document.querySelector('[data-id=products]').children;
const orderSummary = document.querySelector('[data-id=orders]').children;
const packageSummary = document.querySelector('[data-id=package]');
const accountingSummary = document.querySelector('[data-id=accounting]');
const terminalSummary = document.querySelector('[data-id=terminal]');
const totalSummary = document.querySelector('#total-price');

const PRODUCT_PRICE = Number(0.5);
const ORDER_PRICE = Number(0.25);
const OPEN_CLASS = 'open';

const packages = {
    basic: '$10',
    professional: '$15',
    premium: '$25'
};

const totalChangeListener = function () {
    const openCheck = document.querySelectorAll('.open').length;
    const prices = document.querySelectorAll('.list__item.open');

    if(openCheck > 0) {
        let sum = 0;
        prices.forEach((e) => {
            sum += Number(e.lastElementChild.innerText.substring(1));
        });
        totalSummary.lastElementChild.innerText = `$${sum}`;
        totalSummary.classList.add(OPEN_CLASS);
    } else {
        totalSummary.classList.remove(OPEN_CLASS);
    }
};

const numberInputListener = function (collection, callback) {
    let inputValue = this.value;

    if (!isNaN(inputValue)) {
        let currentPrice = 0;
        (this.id === 'products') ? currentPrice = PRODUCT_PRICE : currentPrice = ORDER_PRICE;

        collection[1].innerText = `${inputValue} * $${currentPrice}`;
        collection[2].innerText = `$${inputValue * currentPrice}`;

        (inputValue.length > 0)
            ? collection[0].parentElement.classList.add(OPEN_CLASS)
            : collection[0].parentElement.classList.remove(OPEN_CLASS);
    }
    callback();
};

const checkboxListener = function (element, callback) {
    this.checked ? element.classList.add(OPEN_CLASS) : element.classList.remove(OPEN_CLASS);
    callback();
};

const dropdownListener = function (callback) {
    this.classList.toggle(OPEN_CLASS);
    callback();
};

const selectListener = function (callback) {
    const value = this.dataset.value;
    selectInputElement.innerText = value;
    Object.entries(packages).forEach(([package, price]) => {
        if(package === value) {
            packageSummary.children[1].innerText = value;
            packageSummary.lastElementChild.innerText = price;
        }
    });
    packageSummary.classList.add(OPEN_CLASS);
    callback();
}

productsElement.addEventListener('change', numberInputListener.bind(productsElement, productSummary, totalChangeListener));
ordersElement.addEventListener('change', numberInputListener.bind(ordersElement, orderSummary, totalChangeListener));
selectElements.forEach((e) =>
    e.addEventListener('click', selectListener.bind(e, totalChangeListener))
);
packageElement.addEventListener('click', dropdownListener.bind(packageElement, totalChangeListener));
accountingElement.addEventListener('change', checkboxListener.bind(accountingElement, accountingSummary, totalChangeListener));
terminalElement.addEventListener('change', checkboxListener.bind(terminalElement, terminalSummary, totalChangeListener));
