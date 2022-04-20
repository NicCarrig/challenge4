var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#timer");
var timer = 0;
var questionCounter = 0;
var questions = [
    {
        qNum: 1,
        question: "What is the correct notation for an array?",
        choice: {
            a: "''",
            b: "()",
            c: "[]",
            d: "<>"
        },
        correct: "c"
    },
    {
        qNum: 2,
        question: "What is the correct notation for an array?",
        choice: {
            a: "''",
            b: "()",
            c: "[]",
            d: "<>"
        },
        correct: "c"
    }

];

function startQuiz(){
    //should populate the screen with the first question and 4 buttons for multiple choice answers
    //also needs to clear the start button and start the timer
    startTimer();
}

function checkAnswer(){
    //check the id of the button clicked against the answer key and update the timer
    //should probably call next question function

}

function nextQuestion(){
    //update text content for question and choice buttons

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
    console.log("display the high scores");
}

startBtnEl.addEventListener("click", startQuiz);