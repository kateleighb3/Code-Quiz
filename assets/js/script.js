var questions = [
  {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
  },
  {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "braces", "parentheses", "brackets"],
      answer: "parentheses"
  },
  {
      title: "What tag defines the body of the HTML document, and usually includes all the contents such as the text, hyperlinks, images, tables, lists, and more?",
      choices: ["<head></head>", "<body></body>", "<title></title>", "<br>"],
      answer: "<body></body>"
  },
  {
      title: "What tag is used to define a hyperlink, or link to another page?",
      choices: ["<strong>", "<blockquote>", "<em>", "<a>"],
      answer: "<a>"
  },
  {
      title: "CSS stands for ____ Style Sheets.",
      choices: ["Curious", "Concept", "Cascading", "Concave"],
      answer: "Cascading"
  }
];


var totalTime = 59;
var startButton = document.querySelector("#start-button");
var count = 0;
var totalPoints = 0;
var scoreH1 = document.querySelector("#score");
var lastQ = false;
var submitBtn = document.querySelector("#submit");
var highscore;
var highscoreBtn = document.querySelector("#highscores");
var scoresDiv = document.querySelector("#scoresDiv");

submitBtn.addEventListener("click", function () {
if (localStorage.getItem("Highscore") === null) {
  localStorage.setItem("Highscore", JSON.stringify({
    highscore: 0,
    highscoreArr: []
  }));
}

var input = document.querySelector("#initials").value;
var score = totalPoints + totalTime;
var allscores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;

if (score > highscore) {
  highscore = score;
}
allscores.push(input + score);
localStorage.setItem('Highscore', JSON.stringify({
  highscore,
  highscoreArr: allscores
}));


startAgain();
});


var startOverScreen = document.querySelector("#startOver");
var restartBtn = document.querySelector("#restart");

function startAgain() {
endQuiz.style.display = "none";
startOverScreen.style.display = "block";
}

restartBtn.addEventListener("click", function () {
totalTime = 59;
count = 0;
totalPoints = 0;
lastQ = false;
startDiv.style.display = "block";
quizDiv.style.display = "none";
startOverScreen.style.display = "none";
});

endGame = () => {
lastQ = true;
quizDiv.style.display = "none";
endQuiz.style.display = "block";
var score = totalPoints + totalTime;
scoreH1.textContent = score;
};

answeredRight = () => {
  var footer = document.querySelector(".card-footer");
  footer.textContent = "Correct!";
  totalPoints += 10;
  console.log(highscore);
count++;
setTimeout(()=> {
  footer.textContent=""; 
}, 2000); //clear the footer after 2 seconds
if (count === questions.length) {
  endGame();
} else {
  generateQuestions();
}
};

answeredWrong = () => {
  var footer = document.querySelector(".card-footer");
  footer.textContent="Wrong";
  totalPoints -= 5;
count++;
totalTime -= 10;
setTimeout(()=> {
  footer.textContent=""; 
}, 2000); //clear the footer after 2 seconds
if (count === questions.length) {
  endGame();
} else {
  generateQuestions();
  }
};  

generateQuestions = () => {
document.getElementById("quizQ-header").innerHTML = questions[count].title; 
document.getElementById("choiceButtons").innerHTML = ""; 

questions[count].choices.map((choice, i) => { 
  var btn = document.createElement("button"); 
  var textnode = document.createTextNode(choice); 
  btn.appendChild(textnode); 
  document.getElementById("choiceButtons").appendChild(btn); 
  btn.setAttribute("data", choice);
  btn.setAttribute("id", `btn${i}`); 
  btn.setAttribute("answer", questions[count].answer);


  document.querySelector(`#btn${i}`).addEventListener("click", function (e) { 
    console.log(e.target.getAttribute("data"));
    if (e.target.getAttribute("data") === e.target.getAttribute("answer")) { 
      answeredRight(); 
    } else {
      answeredWrong(); 
    }
  });
});
};

highscoreBtn.addEventListener("click", function(){
  var hsList = JSON.parse(localStorage.getItem("Highscore")).highscoreArr || []; //The hsList variable is populated with the highscores array from local storage. It is parsed using JSON.parse and fallbacks to an empty array if no highscores are found.
  var highscoreDisp = document.getElementById("highscoreDisp"); //his element represents the container where the highscores will be displayed.

  startOverScreen.style.display = "none";
  startDiv.style.display = "none";

  if (scoresDiv.style.display === "none") {  //f the scoresDiv is currently hidden (style.display === "none"), the highscores should be displayed. The highscoreDisp container is cleared by setting its innerHTML to an empty string.
    scoresDiv.style.display = "flex";
    // highscoreDisp.innerHTML = ""; // clear the previous highscores

    hsList.forEach(function (score) {  //A forEach loop is used to iterate over the hsList array. For each highscore, the initials and score are extracted by splitting the string on the space character.
      var initials = score.split(" ")[0];
      var scoreValue = score.split(" ")[1];

      var scoreElement = document.createElement("h3"); //For each highscore, a new h3 element is created using document.createElement("h3"). Inside this element, the initials, a hyphen, and the score value are added as separate elements (span and text nodes).
      var initialsElement = document.createElement("span");
      var scoreValueElement = document.createElement("span");

      initialsElement.textContent = initials;
      scoreValueElement.textContent = scoreValue;

      scoreElement.appendChild(initialsElement); //The elements representing initials and score value are appended as children to the h3 element, and the h3 element is appended to the highscoreDisp container.
      scoreElement.appendChild(document.createTextNode(" - "));
      scoreElement.appendChild(scoreValueElement);

      highscoreDisp.appendChild(scoreElement);
    });
  } else {
    scoresDiv.style.display = "none"; //If the scoresDiv is already displayed (style.display !== "none"), it means the highscores are currently visible. In this case, the scoresDiv is hidden by setting its style.display to "none".

  } 
  }
);


var timerSpan = document.querySelector("#timer");
var startDiv = document.querySelector("#startDiv");
var quizDiv = document.querySelector("#quizDiv");
var endQuiz = document.querySelector("#endQuiz");

startButton.addEventListener("click", function () {
console.log(totalTime);
startDiv.style.display = "none";
quizDiv.style.display = "block";
generateQuestions();

var interval = setInterval(function () {
  totalTime--;
  timerSpan.innerHTML = totalTime;
  console.log("countdown... " + totalTime);
  if (totalTime === 0 || lastQ) {
    clearInterval(interval);
    console.log("Time's up");
    endGame();
  }
}, 1000);

});

