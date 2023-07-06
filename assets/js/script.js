let startButton = document.querySelector('#start-button'); // setting startButton to have the value of css id start-button
let quizContainer = document.querySelector('.quiz-container'); // setting quizContainer to have the value of css class quiz-container
let timerEl = document.querySelector('.time'); // setting timerEl to have the value of css class time

// GLOBAL VARIABLES
let timerInterval;
let secondsLeft;
let scoreCounter = 0;


const quizQuestions = [
    'Commonly used data types DO NOT include:',
    'The condition in an if/else statement is enclosed with______',
    'Arrays in JavaScript can be used to store',
    // Add more questions...
  ];
  
  const quizAnswers = [
    [['1. strings', false], ['2.alerts', true], ['3. booleans', false], ['4. numbers', false]],
    [['1. curly brackets', true], ['2. quotes', false], ['3. parenthesis', false], ['4. square brackets', false]],
    [['1. numbers and strings', false], ['2. other arrays', false], ['3. booleans', false], ['4. all of the above',true]],
    // Add more answers...
  ];
  
  function gameOver() {
    quizContainer.textContent = "All Done!";

  }

  function initializeTimer() {
    secondsLeft = 5;

    if (!timerInterval) {
        timerInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft <= 0) {
              //stops execution of action at set interval
                clearInterval(timerInterval);
                //calls function to create and append message
                gameOver();
            }
        }, 1000);
    }
}

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  // Hide the start button when the button is clicked and then... V
  startButton.style.display = 'none';

  // Call a function to render the first question... and V
  renderQuestion(0);

   // Start the timer
   initializeTimer();
}

function renderQuestion(index) {
    // Get the current question and answer options based on the index
    const question = quizQuestions[index];
    const answers = quizAnswers[index];
  
    // Clear the quiz container
    quizContainer.innerHTML = '';
  
    // Create HTML elements to display the question and answer options
    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
  
    const optionsElement = document.createElement('ul');
    optionsElement.classList.add('options');
  
    // Iterate over the answer options and create list items
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i][0];
      const isCorrect = answers[i][1];
  
      const listItem = document.createElement('li');
      listItem.textContent = answer;
  
      // Add a click event listener to each option to handle the user's choice
      listItem.addEventListener('click', function () {
        if (isCorrect) {
          // Handle correct answer
        } else {
          // Handle wrong answer
        }
  
        // Move to the next question
        renderQuestion(index + 1);
      });
  
      optionsElement.appendChild(listItem);
    }
  
    // Append the question and options to the quiz container
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  