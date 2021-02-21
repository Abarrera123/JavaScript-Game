# JavaScript-Game
Title: Javascript-Quiz-Game

github link : [https://abarrera123.github.io/JavaScript-Game/]

This website is a javascript practice quiz. When taking this quiz you will have 60 seconds to complete 10 questions. If you incorrectly answer a question you will be docked 5 seconds off your total time. When you complete the quiz or if the timer runs out you will be prompted to enter your initials at the end. Once you submit your initials into the text box you will be shown the all time highscore with that user’s initials. 

Why:This project was created to help incorporate and improve my knowledge in javascript, html, and css. This project utilizes my new found knowledge of WEB-APIs. This project helped me understand DOM actions,  and how to combine JS, HTML, and CSS. 


How: 1. My first step was to setup an array of objects containing my question,choices, and the correct answer. After that step I declared all my global variables.

2. Next I created a event listener that will run a function that will start a timer on the webpage and start the quiz.

3.The nextQuestion function will first loop through all the index of the answers array to check whatever the user inputs. If the user picks the right answer then the totalCorrect counter is increase, if not the counter loses 5 seconds. Once the currentQuestion +1 is equal to question.length the quiz will end. At the bottom of that function I built radio buttons that are attached to the questions. 

4.The endQuiz function will hide the next button and show the submit button. Hitting the submit button will start the Subscore function

5. The subscore button will store the current user's score and initials. If that score is higher than a highscore then that score will be saved in the local storage as the new highscore. 


