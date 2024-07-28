import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAsXH-WiX-zq_8hV5qtwn3qvRzPwsuuUD4",
  authDomain: "lipton-41a16.firebaseapp.com",
  projectId: "lipton-41a16",
  storageBucket: "lipton-41a16.appspot.com",
  messagingSenderId: "826266180539",
  appId: "1:826266180539:web:a90f4a669918dd34d7029e",
  measurementId: "G-D559YTEX39"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);