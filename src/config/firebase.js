import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCCoL7j_uFIVHA-gM0AHgCNrbrapJy27tU",
  authDomain: "my-portfolio-68c3b.firebaseapp.com",
  projectId: "my-portfolio-68c3b",
  storageBucket: "my-portfolio-68c3b.appspot.com",
  messagingSenderId: "790177153113",
  appId: "1:790177153113:web:60b6df13d564177884f148",
  measurementId: "G-4WL51CXYTZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);