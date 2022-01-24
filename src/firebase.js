import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTOAOfoWKKGl2uHbgp0UwHA6rBn4yUzIU",
  authDomain: "clone-3fd5d.firebaseapp.com",
  projectId: "clone-3fd5d",
  storageBucket: "clone-3fd5d.appspot.com",
  messagingSenderId: "742554979894",
  appId: "1:742554979894:web:de66f3dc1bccba86a95297",
  measurementId: "G-XBRQKW4GKN",
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getFirestore();
const auth = getAuth();

export { auth, database };
