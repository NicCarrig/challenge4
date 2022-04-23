var headerEl = document.querySelector("#header-area");
var mainBodyEl = document.querySelector(".main-body");
var startBtnEl = document.querySelector("#start-btn");
var scoreBtnEl = document.querySelector(".high-score-btn");
var questionAreaEl = document.querySelector(".question");
var answersAreaEl = document.querySelector(".answers-area");
var timerEl = document.querySelector("#timer");
var responseEl = document.querySelector(".response-area");
var nameFormEl = document.querySelector("#name-form");
var footerEl = document.querySelector(".footer-area");
var timer = 0;
var questionCounter = 0;
var points = 0;
var atScoreScreen = false;
var questions = [
    {
        qNum: 1,
        question: "What is the correct notation for an array?",
        choice: {
            a: "'  '",
            b: "( )",
            c: "[ ]",
            d: "< >"
        },
        correct: "c"
    },
    {
        qNum: 2,
        question: "What are global variables?",
        choice: {
            a: "Variables that are available throughout the code without any scope",
            b: "Variables that are declared in a function",
            c: "Variables that cannot be changed",
            d: "Variables that are used by a GPS"
        },
        correct: "a"
    },
    {
        qNum: 3,
        question: "Which of the following is not a supported data type in JavaScript?",
        choice: {
            a: "Boolean",
            b: "Number",
            c: "Value",
            d: "Object"
        },
        correct: "c"
    },
    {
        qNum: 4,
        question: "What is the logical operator for 'or'?",
        choice: {
            a: "..",
            b: "||",
            c: "!",
            d: "&&"
        },
        correct: "b"
    },
    {
        qNum: 5,
        question: "What is the correct way to get an HTML element with the ID of 'main'?",
        choice: {
            a: "var mainEL = querySelector('#main');",
            b: "var mainEl = document.querySelector('.main');",
            c: "mainEl.querySelector('.main');",
            d: "var mainEl = document.querySelector('#main');"
        },
        correct: "d"
    },
    {
        qNum: 6,
        question: "If x=5, what would be the result of x+=2",
        choice: {
            a: "7",
            b: "52",
            c: "2",
            d: "10"
        },
        correct: "a"
    },
    {
        qNum: 7,
        question: "What is the correct way to use an eventListener?",
        choice: {
            a: "targetEl = eventListener('click', function);",
            b: "targetEl.addEventListener('click', function);",
            c: "eventListener.targetEl('click', function);",
            d: "addEventListener.targetEl('click', function);"
        },
        correct: "b"
    },
    {
        qNum: 8,
        question: "How many times would 'for(i=0; i<10; i++)' loop?",
        choice: {
            a: "9",
            b: "10",
            c: "0",
            d: "it would cause an error in the code"
        },
        correct: "b"
    },
    {
        qNum: 9,
        question: "What is the difference between '==' and '==='?",
        choice: {
            a: "They do the same thing",
            b: "'==' only works for numerical values",
            c: "They both check equality of value, but '===' also checks data type",
            d: "They both check equality of data type, but '===' also checks value"
        },
        correct: "c"
    },
    {
        qNum: 10,
        question: "What is the correct way to get the first element on an array?",
        choice: {
            a: "arr[0]",
            b: "arr[1]",
            c: "arr(0)",
            d: "arr(1)"
        },
        correct: "a"
    }

];

var highScores = [];

function answerAreaEventHandler(event){
    event.preventDefault();

    var buttonClicked = event.target;
    var userAnswer = buttonClicked.getAttribute("data-choice");
    if (buttonClicked.hasAttribute("data-start")){
        startQuiz();
    }
    else if(buttonClicked.hasAttribute("data-choice")){
        checkAnswer(userAnswer);
    }

}
//======================================QUIZ QUESTION FUNCTIONS=================================================
function startQuiz(){
    //should populate the screen with the first question and 4 buttons for multiple choice answers
    //also needs to clear the start button and start the timer
    startBtnEl.remove();
    var letter = ["a", "b", "c", "d"];
    //change text content from quiz rules to first question
    questionAreaEl.textContent = questions[0].question
    //create 4 buttons and populate them with the text in the arary
    for(i=0; i < 4; i++){
        var choiceList = document.createElement("li");
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "answer-btn");
        choiceBtn.setAttribute("id", "btn-"+(i+1));
        choiceBtn.setAttribute("data-choice", letter[i]);
        choiceBtn.textContent = setButtonText(i+1);
        choiceList.appendChild(choiceBtn);
        answersAreaEl.appendChild(choiceList);
    }
    startTimer();
}

function setButtonText(index){
    var str = '';
    switch(index){
        case 1:
            str = questions[questionCounter].choice.a;
            break;
        case 2:
            str = questions[questionCounter].choice.b;
            break;
        case 3:
            str = questions[questionCounter].choice.c;
            break;
        case 4:
            str= questions[questionCounter].choice.d;
            break;
        default:
            console.log("error in setting button text");
    }
    return str;
}

function checkAnswer(userAnswer){
    //check the id of the button clicked against the answer key and update the timer
    //should probably call next question function
    // console.log("check answer");
    if(userAnswer === questions[questionCounter].correct){
        showCorrect();
        points += 10;
    }
    else{
        showIncorrect();
        timer -= 15;                        //remove 15 sec from the timer
        timerEl.textContent = timer;        //updates the timer text immediately rather than each second
    }

    questionCounter++;
    //if there are more questions go to the next one otherwise show the score screen
    if(questionCounter === questions.length){
        scoreScreen();
    }
    else{
        nextQuestion();
    }
    if(timer <= 0){
        scoreScreen();
    }
}

function nextQuestion(){
    //update text content for question and choice buttons
    // console.log("show next question");
    var btn1 = document.getElementById("btn-1");
    var btn2 = document.getElementById("btn-2");
    var btn3 = document.getElementById("btn-3");
    var btn4 = document.getElementById("btn-4");
    questionAreaEl.textContent = questions[questionCounter].question;
    btn1.textContent = setButtonText(1);
    btn2.textContent = setButtonText(2);
    btn3.textContent = setButtonText(3);
    btn4.textContent = setButtonText(4);
}

function showCorrect(){
    //shows that the answer was correct, then clears it after a short time
    responseEl.textContent = "Correct";

    var clearResponse = setInterval(function(){
        responseEl.textContent = "";
        clearInterval(clearResponse);
    }, 3000)
}
function showIncorrect(){
    //show that the answer was incorrect, then clears it after a short time
    responseEl.textContent = "Incorrect";

    var clearResponse = setInterval(function(){
        responseEl.textContent = "";
        clearInterval(clearResponse);
    }, 3000)
}

function startTimer(){
    timer = 90;
    timerEl.textContent = timer;

    var timeLeft = setInterval(function(){
        if(timer >= 0){
            timerEl.textContent = timer;
            timer--;
        }
        else{
            if(!atScoreScreen){
                scoreScreen();
            }
            clearInterval(timeLeft);
        }
    }, 1000);
}
function stopTimer(){
    timer = 0;
    timerEl.textContent = timer;
}

//=================SCORE SCREEN FUNCTIONS==========================================================
function scoreScreen(){
    points = calcScore();
    atScoreScreen = true;
    stopTimer();
    //prompt for name or initials and save to local storage
    for(var i = 0; i < 4; i++){
        var btnEl = document.getElementById("btn-" + (i+1));
        btnEl.remove();
    }
    questionAreaEl.textContent = "High Scores";
    var scoreEl = document.createElement("div");
    scoreEl.textContent = "Your Score: " + points;
    answersAreaEl.appendChild(scoreEl);

    enterName();
    //displayScores();
}
function calcScore(){
    var score = points + timer;
    return score;
}

function enterName(){
    // questionAreaEl.textContent = "High Scores";
    var userNameFormEl = document.createElement("div");
    userNameFormEl.className = "name-form";
    userNameFormEl.innerHTML = "<form id='name-form'><input type='text' name='user-name' data-name='name' placeholder='Enter your name!' /><button class='score-btn' data-name='name' type='submit'>Ok</button></form>";
    nameFormEl.appendChild(userNameFormEl);
    userNameFormEl.addEventListener("submit", checkName);
}
function checkName(event){
    var userName = '';
    event.preventDefault();
    console.log(event);
    userName = document.querySelector("input[name='user-name']").value;
    //name input verification
    if(!userName){
        //if the name is empty, exit the function
        alert("Please enter a name");
        return false;
    }
    else{
        //remove the button and text input then run score function
        while(nameFormEl.hasChildNodes()){
            var nameFormChild = nameFormEl.firstChild;
            nameFormEl.removeChild(nameFormChild);
        }
        sortScores(userName);
    }
}
function populateScoreArray(){
    var savedScores = localStorage.getItem("highScores");
    if(savedScores === null){
        return false;
    }
    savedScores = JSON.parse(savedScores);
    highScores = savedScores;
}
function sortScores(name){
    //convert name and score to an object, add it to highScore array, then sort array by score
    // then save the array to local storage
    console.log("score function ran");
    populateScoreArray();
    var userScore = {
        name: name,
        score: points
    }
    highScores.push(userScore);

    // if there is more than one element in the highScore array, uses a selection sort to sort by points in descending order
    if(highScores.length > 1){
        var temp = '';
        var max_index = 0;
        for(var i = 0; i < highScores.length - 1; i++){
            max_index = i;
            for(var j = i+1; j < highScores.length; j++){
                if(highScores[j].score > highScores[max_index].score){
                    max_index = j;
                }
                temp = highScores[max_index];
                highScores[max_index] = highScores[i];
                highScores[i] = temp;
            }
        }
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScores();
}
function displayScores(){
    //get the array from local storage and display it
    //append list items for scores to answersAreaEl
    populateScoreArray();
    while(headerEl.hasChildNodes()){
        var headerChild = headerEl.firstChild;
        headerEl.removeChild(headerChild);
    }
    while(answersAreaEl.hasChildNodes()){
        var ansChild = answersAreaEl.firstChild;
        answersAreaEl.removeChild(ansChild);
    }
    questionAreaEl.textContent = "High Scores";
    for(var i = 0; i < highScores.length; i++){
        var scoreListItem = document.createElement("li");
        scoreListItem.setAttribute("id", "score-list-item");
        scoreListItem.textContent = highScores[i].name +": " + highScores[i].score;
        answersAreaEl.appendChild(scoreListItem);
    }
    createFooterButtons();
}
function createFooterButtons(){
    //make a button element for resetting the high scores and another for taking the quiz again
    var resetQuizBtn = document.createElement("button");
    resetQuizBtn.textContent = "Take Quiz";
    resetQuizBtn.setAttribute("id", "reset-quiz-btn");
    footerEl.appendChild(resetQuizBtn);
    var resetScoresBtn = document.createElement("button");
    resetScoresBtn.textContent = "Reset High Scores";
    resetScoresBtn.setAttribute("id", "reset-scores-btn");
    footerEl.appendChild(resetScoresBtn);
    resetQuizBtn = document.querySelector("#reset-quiz-btn");
    resetScoresBtn = document.querySelector("#reset-scores-btn");
    resetQuizBtn.addEventListener("click", resetQuiz);
    resetScoresBtn.addEventListener("click", resetScores);
}
function resetScores(){
    console.log("reset scores");
    localStorage.clear();
    //could also use localStorage.removeItem("highScores") if local storage needed from something else
}
function resetQuiz(){
    //should go from the score screen back to the quiz screen
    console.log("reset quiz");
    window.location.reload();
}


scoreBtnEl.addEventListener("click", displayScores);
answersAreaEl.addEventListener("click", answerAreaEventHandler);
// nameFormEl.addEventListener("submit", scoreHandler);