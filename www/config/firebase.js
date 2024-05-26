
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkIJdDSEw2vZU3-9MmMJbxonH1N_--h6k",
    authDomain: "daim-pnj.firebaseapp.com",
    projectId: "daim-pnj",
    storageBucket: "gs://daim-pnj.appspot.com",
    messagingSenderId: "974649478803",
    appId: "1:974649478803:web:fa3a5ffa0b71515de50766"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase)
const storageRef = ref(storage)

export {ref, listAll, getDownloadURL, storage, storageRef}

// modules.exports = {storage, firebase, storageRef, getStorage, ref, listAll, getDownloadURL, }