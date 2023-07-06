// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase ,ref,onChildAdded ,push  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdauK5qK-JTB9kQLjJXZVOuVLf8mCwhwA",
  authDomain: "quizapp-with-db-4b86b.firebaseapp.com",
  databaseURL: "https://quizapp-with-db-4b86b-default-rtdb.firebaseio.com",
  projectId: "quizapp-with-db-4b86b",
  storageBucket: "quizapp-with-db-4b86b.appspot.com",
  messagingSenderId: "687991216406",
  appId: "1:687991216406:web:70d34375488d4c51e79837",
  measurementId: "G-1F9T5D0GY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()







var questions = []; // Define the questions array as empty

function getDataFromDatabase() {




    const reference =  (ref(db, 'questions/'));
    onChildAdded(reference, function(data) {
        console.log(data.val());
        questions.push(data.val());



        rendarQuestions(); // Call the rendering function after data retrieval
    });
}

getDataFromDatabase();





var questions = []



var currentQuestions = document.getElementById("currentQuestions")
var totalQuestion = document.getElementById("totalQuestion")
var question = document.getElementById("question")
var Answers = document.getElementById("Answers")

var indexNum = 0
var score = 0 





window.nextQuestion = function() {
    indexNum++;
    if (indexNum < questions.length) {
        rendarQuestions();
    } else {
        alert("Quiz completed");
        document.getElementById("NextButton").disabled = true; 
    }
}



window.checkQuestion = function(a , b) {
    if(a == b){
        score++
        console.log(score);
    }
    nextQuestion()
}



function rendarQuestions() {
    currentQuestions.innerHTML = indexNum + 1;
    totalQuestion.innerHTML = questions.length;
    var obj = questions[indexNum];
    question.innerHTML = obj.question;

    // Loop through answers

    Answers.innerHTML = "";

    for (let i = 0; i < obj.options.length; i++) {
        Answers.innerHTML += `<div class="col-md-6">
            <div class="py-3">
                <button type="button" onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-info w-100">
                ${obj.options[i]}
                </button>
            </div>
        </div>`;
    }
}