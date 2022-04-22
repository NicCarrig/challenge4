var startBtnEl = document.querySelector("#start-btn");
var scoreBtnEl = document.querySelector(".high-score-btn");
var questionAreaEl = document.querySelector(".question");
var answersAreaEl = document.querySelector(".answers-area");
var timerEl = document.querySelector("#timer");
var responseEl = document.querySelector(".response-area");
var timer = 0;
var questionCounter = 0;
var points = 0;
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
    }

];

var highScores = [];

function answerAreaEventHandler(event){
    var buttonClicked = event.target;
    var userAnswer = buttonClicked.getAttribute("data-choice");
    // console.log(event.target);
    // console.log(userAnswer);
    if (buttonClicked.hasAttribute("data-start")){
        startQuiz();
    }
    else{
        checkAnswer(userAnswer);
    }

}

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
    console.log("correct answer");
    responseEl.textContent = "Correct";

    var clearResponse = setInterval(function(){
        responseEl.textContent = "";
        clearInterval(clearResponse);
    }, 5000)
}
function showIncorrect(){
    //show that the answer was incorrect, then clears it after a short time
    console.log("incorrect answer");
    responseEl.textContent = "Incorrect";

    var clearResponse = setInterval(function(){
        responseEl.textContent = "";
        clearInterval(clearResponse);
    }, 5000)
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
            console.log("time is up");
            scoreScreen();
            clearInterval(timeLeft);
        }
    }, 1000);

}

function scoreScreen(){
    //prompt for name or initials and save to local storage
    console.log("display the high scores");
    questionAreaEl.textContent = "High Scores"
    for(var i = 0; i < 4; i++){
        var btnEl = document.getElementById("btn-" + (i+1));
        btnEl.remove();
    }
}

function resetQuiz(){
    //should go from the score screen back to the quiz screen
    
}

scoreBtnEl.addEventListener("click", scoreScreen);
answersAreaEl.addEventListener("click", answerAreaEventHandler);