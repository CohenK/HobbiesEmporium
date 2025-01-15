import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../environments/environment";


const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

export { app, db };