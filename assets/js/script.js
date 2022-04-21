var startBtnEl = document.querySelector("#start-btn");
var scoreBtnEl = document.querySelector(".high-score-btn");
var questionAreaEl = document.querySelector(".question");
var answersAreaEl = document.querySelector(".answers-area");
// var answerButtonEl = document.querySelector(".answer-btn");
var timerEl = document.querySelector("#timer");
var timer = 0;
var questionCounter = 0;
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
        question: "What is the correct notation for an array?",
        choice: {
            a: "'  '",
            b: "( )",
            c: "[ ]",
            d: "< >"
        },
        correct: "c"
    }

];

function answerAreaEventHandler(event){
    console.log(event.target);
    var buttonClicked = event.target;
    if (buttonClicked.hasAttribute("data-start")){
        startQuiz();
    }
    else{
        checkAnswer();
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

function checkAnswer(){
    //check the id of the button clicked against the answer key and update the timer
    //should probably call next question function
    console.log("check answer");
    questionCounter++;
    nextQuestion();
}

function nextQuestion(){
    //update text content for question and choice buttons
    console.log("show next question");
}

function startTimer(){
    timer = 10;

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
}

function resetQuiz(){

}

scoreBtnEl.addEventListener("click", scoreScreen);
answersAreaEl.addEventListener("click", answerAreaEventHandler);