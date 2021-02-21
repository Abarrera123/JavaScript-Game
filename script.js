//variable to store my object that contains an array of questions, choices, and the correct answer
var questions =[{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
},{
	question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
},{
	question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
},{
	question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
	question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
}];
// Setting global variables
var startButton = document.getElementById("startButton")
var nextButton = document.getElementById("nextButton")
var secondsLeft = 60
var timeEl = document.getElementById("timeShow")
var score = document.getElementById("result")
//Current question is set to -1 so we know the first question wont be shown until the nextQuestion function starts 
var currentQuestion = -1
var  totalCorrect = 0

//This event listener that will run a function to start the timer and start the quiz.
//This function also will hide the start button on click and show the next button on click
startButton.addEventListener("click",function(){
    var rules = document.getElementById("rules");
    rules.style.display = "none"; 
    document.getElementById("nextButton").style.display = "block";
    secondsLeft = 60
    setTime()
    nextQuestion()
})
//This event changes the question on click
document.getElementById("nextButton").addEventListener("click",nextQuestion)
//Function that will store user answer and switch to the next question on a click
function nextQuestion(){
    //capture answer if currentQuest >-1
    if (currentQuestion > -1) {
       var answers = document.getElementsByName("answer")
       var checkedAnswer = -1
       //This for loop will iterate through the answers for the question and change value of checkedAnswer based on user input
        for ( i =0; i < answers.length; i++){
            if(answers[i].checked){
                checkedAnswer = answers[i].value;
            } 
        }
        //assuring the user picks one answer
        if ( checkedAnswer < 0) {
            alert("Please select a answer before hitting next.")
            return;
        }
        //check if correct
        var qObject=questions[currentQuestion];
        if (checkedAnswer == qObject.correctAnswer){
            totalCorrect++;
        } else{
           //subtracs 5 seconds of the current time if the answer is wrong
           secondsLeft = secondsLeft - 5;
        }   
    }
    if( currentQuestion + 1 == questions.length ){
        //Test is done, show highscore call function endQuiz
       endQuiz()
        return;
    }
    //this part of the function will up the count of current question, and then show the next question
    currentQuestion ++;
    qObject=questions[currentQuestion];
    document.getElementById("question").innerHTML=qObject.question;
    //this line clears the previous question
    document.getElementById("choiceList").innerHTML = ' <br/>'
    //this loop iterates through the choiceList array and creates a radio button for each one. 
    for( i = 0; i < qObject.choices.length; i++){
        document.getElementById("choiceList").innerHTML += '<input type="radio" name="answer" id= "' + i + '" value= "' + i + '"><label for="' + i + '">' +qObject.choices[i]+ "</label><br></br>";
    }
}
function endQuiz(){
    //captures the user's initials on input
    document.getElementById("result").innerHTML = 'Please enter your initials <input type="text" id= "initials" > Total score:  ' +totalCorrect;
    //when this function is run, the submitButton is shown
    document.getElementById("submitButton").style.display = "block";
    //When this function is run, the nextButton is hidden
    document.getElementById("nextButton").style.display = "none";
    //On click on the submit button, subsScore is run
    document.getElementById("submitButton").addEventListener("click",subScore);
}
    //function to store quiz results in local storeage when test is complete
function subScore(){
    //object that stores the current test results
    var scoreSheet ={
        initials: document.getElementById("initials").value,
        score: totalCorrect
    }
    //setting user inputed initials into local storage
    localStorage.setItem("Last-Score", JSON.stringify(scoreSheet))
    //setting and posting highscore on page
    var highScore = JSON.parse(localStorage.getItem("highcore"));
    //if there is no highscore, a blank object is stored in local storage
    if (highScore == undefined)
     highScore ={
        initials: "",
        score: 0}
    //If the current score of the quiz is higher than a previous highscore, the highscore is replaced
    if (totalCorrect > highScore.score){
        highScore = scoreSheet
    localStorage.setItem("Highscore", JSON.stringify(highScore));
    }
    displayScore(highScore, scoreSheet)
}
//function to display highscore when submit button is clicked
function displayScore(highScore, scoreSheet){
    let scoreBoard = document.createElement("div");
    scoreBoard.id= "scoreBoard";
    scoreBoard.textContent = "All time scores: " +highScore.initials+ " " +highScore.score  ;
    document.getElementById("quiz-container").appendChild(scoreBoard);
    document.getElementById("submitButton").disabled = true;
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time remaining: " + secondsLeft 
        secondsLeft--;
      if(secondsLeft < 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        endQuiz();
      }
    }, 1000);
  }
  


