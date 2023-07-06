// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase , set, ref , push  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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





var question = document.getElementById("question")
var option = document.getElementById("option")
var optionparent = document.getElementById("optionparent")
var correctanswerElem = document.getElementById("correctanswer")

var options = []
var correctanswer 

function renderaoption() {
    optionparent.innerHTML = ""
    for (let i = 0; i < options.length; i++) {
       optionparent.innerHTML += `<li onclick="SetCorrectAnswers('${options[i]}')" class ="p-3 bg-light fs-4 rounded sahdow my-2" >${options[i]}</li>` 
    }
}

window.addQuestion = function() {
  options.push(option.value)
  console.log(options);
  option.value = ""
  renderaoption()
};



window.SetCorrectAnswers = function (a) {
  correctanswer = a
  correctanswerElem.innerHTML = correctanswer
}

window.SubmitQuestion  = function () {
  var obj = {
    question : question.value,
    options : options,
    correctanswer : correctanswer
  }



obj.id = push(ref(db, "questions/")) .key

  const reference = ref(db, `questions/${obj.id}`)

set(reference , obj)

  console.log(obj);
}