import { Injectable } from '@angular/core';
import * as firebase from "firebase"
@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = firebase.default.firestore()
  constructor() { }

  async consultar(){
    return await new Promise<any>((resolve,reject)=>{
      this.db.collection("Inventario")
    })
  }

  async alta(form){
    return await new Promise<any>((resolve,reject)=>{
      this.db.collection("inventario").doc().set({
        "Tipo":form.tipo,
        "Marca":form.marca,
        "Modelo":form.modelo,
        "NS":form.ns,
        "Estado":form.estado,
        "Ubicacion":form.ubicacion,
        "Fecha_Registro":form.registro,
        "Fecha_Salida":"",
        "Costo":form.costo,
    })
    })
  }
}
