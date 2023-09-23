const buttonStart = document.querySelector('.button-start');
const content = document.querySelector('.content');

let range = [1, 100];

const startGame = ([a, b]) => {
    let ammounts = 0;
    const number = Math.floor(Math.random() * (b - a + 1)) + a;
    console.log(number);

    content.innerHTML = `
    <ul class="content__list">
        <li class="content__message computer-message">
        <span class="content__text"
            >Я загадал число от ${a} до ${b}, попробуйте его угадать!</span
        >
        </li>
    </ul>

    <input
        type="text"
        class="content__input"
        placeholder="Введите число"
    />

    <div class="footer">
        <span class="footer__counter">Попыток потрачено: ${ammounts}</span>
        <div class="footer__group">
        <button class="footer__button button-range">
            Указать диапазон
        </button>
        <div class="input-group">
            <input
            type="text"
            class="footer__input input-min"
            oninput="this.value = this.value.replace(/\D/g, '')"
            placeholder="min"
            />
            <input
            type="text"
            class="footer__input input-max"
            oninput="this.value = this.value.replace(/\D/g, '')"
            placeholder="max"
            />
        </div>
        </div>
        <button class="footer__button button-reset">Перезапуск</button>
    </div>
    `;

    const input = content.querySelector('.content__input');
    const list = content.querySelector('.content__list');
    const buttonReset = content.querySelector('.button-reset');
    const buttonRange = content.querySelector('.button-range');
    const footerAmounts = content.querySelector('.footer__counter');

    //Работа с инпутом и отображением общения с машиной (система подсказок и счетчик)!
    input.focus();

    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '')
        input.style = 'border: none';

        if (e.target.value < a || e.target.value > b) {
            input.style = 'border: 1px solid red';
        }

        e.target.value === '' ? input.style = 'border: none' : ''
    })

    const computerAnswer = (value, [a, b]) => {
        const li = document.createElement('li');
        const attemptThird = ammounts % 3 === 0;
        const hint = number % 2 === 0 ? 'Даю подсказку, число, которое я загадал - чётное' : 'Даю подсказку, число, которое я загадал - нечётное';
        li.classList.add('content__message');
        li.classList.add('computer-message');

        if (value < a || value > b) {
            li.innerHTML = `<span class="content__text">Вы вышли за диапазон</span>`;
        } else if (value < number) {
            li.innerHTML = `<span class="content__text">Ваше число меньше загаданного</span>`;
        } else if (value > number) {
            li.innerHTML = `<span class="content__text">Ваше число больше загаданного</span>`;
        } else if (value === number) {
            li.innerHTML = `<span class="content__text">Вы угадали!</span>`;
        }
        if (attemptThird) {
            li.innerHTML += `<br><br><span class="content__text">${hint}</span>`;
        }

        return li;
    }

    const pushAnswer = (value) => {
        if (value === number) {
            input.setAttribute('disabled', true);
        }
        const li = document.createElement('li');
        li.classList.add('content__message');
        li.classList.add('user-message');
        li.innerHTML = `<span class="content__text">${value}</span>`;
        list.append(li);
    }

    const handleAnswer = (value) => {
        pushAnswer(value);
        ammounts++;
        list.append(computerAnswer(value, range));
        footerAmounts.innerHTML = `Попыток потрачено: ${ammounts}`;
        input.value = '';
    }

    input.addEventListener('blur', (e) => {
        if (e.target.value === '' || e.target.attributes.disabled) return

        handleAnswer(+e.target.value);
    })

    input.addEventListener('keydown', (e) => {
        if (e.target.value === '') return

        if (e.key === 'Enter') {
            handleAnswer(+e.target.value);
        }
    })

    //Рестарт игры
    buttonReset.addEventListener('click', () => {
        startGame(range);
    });

    //Диапазон
    buttonRange.addEventListener('click', () => {
        const min = content.querySelector('.input-min').value;
        const max = content.querySelector('.input-max').value;

        const inputGroup = content.querySelector('.input-group');
        if (inputGroup.classList.contains('active')) {
            if (min === '' && max === '') inputGroup.classList.toggle('active');
            if (min === '' || max === '' || +min > +max) return
            range = [+min, +max];
            startGame(range);
        };
        inputGroup.classList.toggle('active');
    })
}

buttonStart.addEventListener('click', () => {
    startGame(range);
});