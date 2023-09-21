let productArray = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
let kcalLevel = localStorage.getItem('kcalLevel') ? +localStorage.getItem('kcalLevel') : 0;
const buttonAdd = document.querySelector('.button-add');
const buttonRemove = document.querySelector('.button-remove');
const checkboxForAll = document.querySelector('.check-all');
const kcalPerDay = document.querySelector('.content__kcal_per-day');
const searchInput = document.querySelector('#filter');
const kcalSet = document.querySelector('.kcal-for-day');


const productTemplate = (item) => {
    const li = document.createElement('li');
    li.classList.add('content__item');

    li.innerHTML = `
    <label class="content__checkbox">
        <input ${item.isChecked ? 'checked' : ''} type="checkbox" class="content__input" />
        <span class="content__text">${item.name}</span>
    </label>
    <span class="content__kcal">${numberWithSpaces(item.kcal)} ккал</span>
    `
    const index = productArray.indexOf(item);
    const checkbox = li.querySelector('.content__checkbox');

    checkbox.addEventListener('change', () => {
        productArray[index].isChecked = !productArray[index].isChecked;
        productArray.filter(item => item.isChecked).length === productArray.length ? checkboxForAll.checked = true : checkboxForAll.checked = false;
        renderProducts();
    })

    return li;
}

const renderProducts = () => {
    const ul = document.querySelector('.content__list');
    ul.innerHTML = '';
    productArray.forEach((item) => {
        ul.appendChild(productTemplate(item));
    })
    checkArray();
    countKcalPerDay();
    saveLocalStorage('products', productArray);
}

const checkArray = () => {
    const content = document.querySelector('.content');

    productArray.length === 0 ? content.classList.add('hide') : content.classList.remove('hide');
}

//Добавление продукта
buttonAdd.addEventListener('click', () => {
    const kcalInput = document.querySelector('#calorie');
    const nameInput = document.querySelector('#product');

    kcalInput.value === '' ? kcalInput.classList.add('content__error') : kcalInput.classList.remove('content__error');
    nameInput.value === '' ? nameInput.classList.add('content__error') : nameInput.classList.remove('content__error');

    if (kcalInput.value === '' || nameInput.value === '') return;

    const product = {
        name: nameInput.value,
        kcal: kcalInput.value,
        isChecked: false,
        date: new Date().toISOString().slice(0, 10)
    }

    productArray.push(product);

    kcalInput.value = '';
    nameInput.value = '';

    renderProducts();
})


buttonRemove.addEventListener('click', () => {
    productArray = productArray.filter(item => !item.isChecked);

    if (productArray.length === 0) return checkboxForAll.checked = false;


    renderProducts();
})

checkboxForAll.addEventListener('change', () => {
    productArray.forEach(item => item.isChecked = checkboxForAll.checked);
    renderProducts();
})

const numberWithSpaces = (num) => {
    const string = num.toString();
    if (string.length < 4) {
        return string
    }
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
};

const countKcalPerDay = () => {
    kcalPerDay.innerHTML = '';
    let sum = 0;
    const today = new Date().toISOString().slice(0, 10);

    productArray.forEach(item => item.date === today ? sum += +item.kcal : '');

    kcalLevel <= sum && kcalLevel !== 0 ? kcalSet.classList.add('error') : '';

    kcalPerDay.innerHTML = `Ккал потребленные за день: ${numberWithSpaces(sum)}`;

    renderChart()
}

const sortProductsByKcal = () => {
    productArray.sort((a, b) => b.kcal - a.kcal);
    renderProducts();
}

let sortSmaller = true;

const sortByKcal = () => {
    sortSmaller = !sortSmaller;
    sortSmaller ? productArray.sort((a, b) => a.kcal - b.kcal) : productArray.sort((a, b) => b.kcal - a.kcal)
    renderProducts();
}

const sortKcal = document.querySelector('.sort-kcal');
sortKcal.addEventListener('click', sortByKcal);

const filterProductsByName = (name) => {
    const filteredProducts = productArray.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    renderFilteredProducts(filteredProducts);
}

const renderFilteredProducts = (filteredProducts) => {
    const ul = document.querySelector('.content__list');
    ul.innerHTML = '';
    filteredProducts.forEach((item) => {
        ul.appendChild(productTemplate(item));
    })
}

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterProductsByName(searchTerm);
})

const setCalories = () => {
    kcalSet.classList.remove('kcal__set');
    kcalSet.innerHTML = 'Целевой показатель ккал: <input class="input-kcal content__input" value="" type="text" >';
    const input = kcalSet.querySelector('.input-kcal');

    input.focus();

    const handleInput = () => {
        kcalSet.classList.remove('error');
        if (input.value !== '') {
            input.value = numberWithSpaces(input.value);
            input.setAttribute('readonly', '');
            kcalLevel = +input.value;
            countKcalPerDay();
        } else {
            kcalSet.classList.add('kcal__set');
            kcalSet.innerHTML = 'Установить дневную норму';
            kcalLevel = 0;
        }
        saveLocalStorage('kcalLevel', kcalLevel);
    }

    input.addEventListener('input', (event) => {
        const value = event.target.value;
        const filteredValue = value.replace(/\D/g, '');

        if (value !== filteredValue) event.target.value = filteredValue;
    })

    input.addEventListener('blur', handleInput);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleInput();
        }
    });
}

kcalSet.classList.contains('kcal__set') ? kcalSet.addEventListener('click', setCalories) : '';

const renderChart = () => {
    const chartContainer = document.querySelector('.chart');
    chartContainer.innerHTML = '';

    const uniqueDates = [...new Set(productArray.map(item => item.date))];

    const allKcal = productArray.reduce((acc, item) => acc + +item.kcal, 0);

    uniqueDates.forEach((date) => {
        const filteredProducts = productArray.filter(item => item.date === date);
        const sum = filteredProducts.reduce((acc, item) => acc + +item.kcal, 0);

        const bar = document.createElement('div');
        bar.classList.add('bar');

        const barWidth = (sum / allKcal) * 100;
        bar.style.width = `${barWidth}%`;

        const label = document.createElement('div');
        label.classList.add('chart-label');
        label.textContent = `${date}: ${sum} ккал`;

        bar.appendChild(label);
        chartContainer.appendChild(bar);
    })
};

const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const init = () => {
    renderProducts();
    if (kcalLevel !== 0) {
        kcalSet.classList.remove('kcal__set');
        kcalSet.innerHTML = `Целевой показатель ккал: <input class="input-kcal content__input" value="${kcalLevel}" type="text" >`;
    }
}

init()