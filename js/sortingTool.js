
/* JavaScript for Sorting Visualization Tool */
const arrayContainer = document.getElementById('array-container');
const startButton = document.getElementById('start-sort');
const generateButton = document.getElementById('generate-array');
const algorithmSelect = document.getElementById('algorithm');

let array = [];

function generateArray(size = 20) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');

            await sleep(100);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
            }

            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

async function insertionSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add('comparing');

        while (j >= 0 && array[j] > key) {
            bars[j].classList.add('comparing');

            array[j + 1] = array[j];
            renderArray();

            await sleep(100);

            bars[j].classList.remove('comparing');
            j--;
        }
        array[j + 1] = key;
        renderArray();

        bars[i].classList.remove('comparing');
    }

    document.querySelectorAll('.array-bar').forEach(bar => bar.classList.add('sorted'));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

startButton.addEventListener('click', () => {
    const algorithm = algorithmSelect.value;
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'insertion') insertionSort();
});

generateButton.addEventListener('click', () => generateArray());

generateArray();
