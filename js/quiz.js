/* JavaScript for Dynamic Quiz App */
const questions = [
    {
        question: 'What is the capital of France?',
        answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correct: 2
    },
    {
        question: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
        correct: 1
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-question');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const summaryElement = document.getElementById('summary');
const restartButton = document.getElementById('restart-quiz');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });

    nextButton.disabled = true;
}

function selectAnswer(index) {
    selectedAnswer = index;
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach((button, i) => {
        button.style.backgroundColor = i === index ? '#007bff' : '#fff';
        button.style.color = i === index ? '#fff' : '#000';
    });
    nextButton.disabled = false;
}

function handleNextQuestion() {
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';
    nextButton.style.display = 'none';
    resultsElement.style.display = 'block';

    scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
    const correctAnswers = questions.map((q, i) => `Q${i + 1}: ${q.answers[q.correct]}`).join('<br>');
    summaryElement.innerHTML = `Correct Answers:<br>${correctAnswers}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    questionElement.style.display = 'block';
    answersElement.style.display = 'flex';
    nextButton.style.display = 'inline-block';
    resultsElement.style.display = 'none';
    loadQuestion();
}

nextButton.addEventListener('click', handleNextQuestion);
restartButton.addEventListener('click', restartQuiz);

loadQuestion();
