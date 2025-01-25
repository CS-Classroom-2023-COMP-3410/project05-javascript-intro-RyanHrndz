
/* JavaScript for Keyboard Trainer */
const textToTypeElement = document.getElementById('text-to-type');
const userInputElement = document.getElementById('user-input');
const startButton = document.getElementById('start-trainer');
const resultsElement = document.getElementById('results');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

const textSamples = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is a versatile and powerful programming language.",
    "Typing quickly and accurately takes practice and patience.",
    "Always remember to take breaks and rest your hands while typing.",
    "Consistency is key to mastering any skill, including typing."
];

let startTime;
let timerInterval;
let currentText;
let totalKeystrokes = 0;
let correctKeystrokes = 0;

function startTrainer() {
    currentText = textSamples[Math.floor(Math.random() * textSamples.length)];
    textToTypeElement.textContent = currentText;
    userInputElement.value = '';
    userInputElement.disabled = false;
    userInputElement.focus();
    resultsElement.style.display = 'none';
    startTime = Date.now();
    totalKeystrokes = 0;
    correctKeystrokes = 0;

    userInputElement.addEventListener('input', handleTyping);
}

function handleTyping() {
    totalKeystrokes++;
    const input = userInputElement.value;
    const isCorrect = currentText.startsWith(input);

    if (isCorrect) {
        correctKeystrokes = input.length;
        if (input === currentText) {
            finishTrainer();
        }
    } else {
        userInputElement.style.borderColor = 'red';
    }
}

function finishTrainer() {
    const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
    const wordsTyped = currentText.split(' ').length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);

    userInputElement.disabled = true;
    userInputElement.removeEventListener('input', handleTyping);
    resultsElement.style.display = 'block';
    wpmElement.textContent = `Words Per Minute (WPM): ${wpm}`;
    accuracyElement.textContent = `Accuracy: ${accuracy}%`;
    userInputElement.style.borderColor = '#ccc';
}

startButton.addEventListener('click', startTrainer);