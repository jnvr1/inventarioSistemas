import { Injectable } from '@angular/core';
import * as firebase from "firebase"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async SignIn(email,password){
    return await new Promise<any>((resolve,reject)=>{
      firebase.default.auth().signInWithEmailAndPassword(email,password).then(
        res => {
          firebase.default.auth().onAuthStateChanged(user=>{
            
          })
          resolve(res)
        },
        err => reject(err)
      )
    })
  }

  async logout(){
    return await new Promise<any>((resolve,reject)=>{
      firebase.default.auth().signOut().then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
}
