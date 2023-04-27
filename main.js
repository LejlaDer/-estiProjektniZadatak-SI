import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8NhUO4g3pjv_ZS1vedyCB8GfINBpVB0A",
  authDomain: "grupni-ra.firebaseapp.com",
  projectId: "grupni-ra",
  storageBucket: "grupni-ra.appspot.com",
  messagingSenderId: "702764065139",
  appId: "1:702764065139:web:e3710c4a2274b2f35a6506",
  measurementId: "G-YQJBQJS0CQ"
};



initializeApp(firebaseConfig);
let theDate = document.getElementById("myDate");
let theDoctor = document.getElementById("myDoctor"); //dodaj u form ime doktora da se trazi
let theName = document.getElementById("myName"); //dodaj ime osobe isto tu
let theSymp = document.getElementById("mySymptoms"); //dodaj simptome 2
const db = getFirestore();

const colRef = collection(db, 'Appointments');
let apts = [];
getDocs(colRef)
  .then((snapshot)=> {
    snapshot.docs.forEach((doc) => {
      apts.push({...doc.data()});
    })
    
    
  })
  .catch(err=>{
    console.log(err.message);
  })
//for petlja koja uporedjuje brojeve u datumu i koja uporedjuje sve datume da ne bude nista na isti
//let parts = somedate.split('-');
//      console.log(parts);
function buttonGet(){
  let exists=false;
  apts.forEach((apt) => {
    if(theDate.value===apt.Date){
      exists = true;
    }
  })
    if(!exists){
      const doc = addDoc(colRef, { Date: theDate.value, Doctor: theDoctor.value, Symptoms: theSymp.value, Name: theName.value }).then((doc) => {
        console.log("radi mozda");
      })
    }
    else{
      alert("Taj datum je zauzet.");
    }
  
  
}

const submitBtn = document.querySelector('.lilbtn');
submitBtn.addEventListener("click", buttonGet);