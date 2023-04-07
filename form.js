// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey:
//     authDomain:
//     projectId:
//     storageBucket:
//     messagingSenderId:
//     appId:
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//CRUD ops for the document
import { addDoc, updateDoc, deleteDoc, getDoc, getFirestore, doc, setDoc, collection, deleteField }
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
const db = getFirestore();
//standard inputs
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const userComments = document.getElementById('comments');
//checkbox inputs
const checkProblem = document.getElementById('problem');
const checkSuggestion = document.getElementById('suggestion');
const checkOther = document.getElementById('other');
//radio inputs
const prefContact = document.getElementsByName('pref-type');

//add info to array based on selected checkboxes
function checkCategories() {
    var sCategory = "";

    if (checkProblem.checked == true)
        sCategory += "Problems";
    if (checkSuggestion.checked == true)
        sCategory += ", Suggestions";
    if (checkOther.checked == true)
        sCategory += ", Other";

    return sCategory;
}
//which contact preference did user choose
function checkPreference() {
    var prefType = "";
    var pref = document.forms[0];
    var i;
    for (i = 0; i < pref.length; i++) {
        if (pref[i].checked == true)
            prefType = pref[i].value;
    }
    return prefType;
}
//add user info    
async function addInfo() {
    var ref = doc(db, "weeknd-website", userEmail.value);
    const docRef = await setDoc(
        ref, {
        Email: userEmail.value,
        Phone: userPhone.value,
        Comments: userComments.value,
        Category: checkCategories.apply(),
        Preference: checkPreference.apply()

    }
    )
        .then(() => {
            showAlert();
        })
        .catch((error) => {
            showError();
        });

}

function showAlert() {
    const showBox = document.getElementById('alertBox');
    showBox.style.opacity = '1';
    showBox.style.animation = 'fadeIn 1s'
}

function showError() {
    const showError = document.getElementById('alertBox-error');
    showError.style.opacity = '1';
    showError.style.animation = 'fadeIn 1s'
}

submitButton.addEventListener("click", addInfo);

