import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../app/firebase';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, `users/${user.uid}`);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.id;
    } else {
      throw new Error('User information not found in Firestore');
    }
  }
  

  async register(email: string, password: string) {
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email: email,
        password: password,
        orders: [],
        cart: new Cart().serialize()
      });
      return user;
    }catch(error){
      console.error("There was an error creating user: ", error);
    }
    return null;
  };
}