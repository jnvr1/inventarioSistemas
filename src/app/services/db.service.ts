import { Injectable } from '@angular/core';
import * as firebase from "firebase"

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = firebase.default.firestore()
  constructor() { }

  async consultar(){
    
    const snapshot = await this.db.collection("inventario").get()
    let data = new Map()

    snapshot.docs.map(doc => {
      data.set(doc.id,doc.data())
    });
    return data
  }

  async alta(form){
    return await new Promise<any>((resolve,reject)=>{
      this.db.collection("inventario").doc().set({
        "Tipo":form.value.tipo,
        "Marca":form.value.marca,
        "Modelo":form.value.modelo,
        "NS":form.value.ns,
        "Estado":form.value.estado,
        "Ubicacion":form.value.ubicacion,
        "Fecha_Registro":form.value.registro,
        "Fecha_Salida":"",
        "Costo":form.value.costo,
        "Descripcion":form.value.descripcion,
        "Disponible":form.value.estado=="Bueno",
        "Color":form.value.estado=="Bueno"?"#79a32d":form.value.estado=="Dañado"?"#ffd56c":form.value.estado=="Irreparable"?"#d65656":"",
        "Prestado":false,
        "Evento":false
    }).then(
      res=>resolve(res),
      err=>reject(err))
    })
  }

  async getItem(id){
    const snapshot = await this.db.collection("inventario").doc(id).get()
    return snapshot.data()
  }

  async editItem(id,form,fileStoragePath,file){
    const imageRef=firebase.default.storage().ref(id)
    await imageRef.put(file)
     let url = await imageRef.getDownloadURL()
     console.log(url)
    return await new Promise<any>((resolve,reject)=>{
      this.db.collection("inventario").doc(id).update({
        "Tipo":form.value.tipo,
        "Marca":form.value.marca,
        "Modelo":form.value.modelo,
        "NS":form.value.ns,
        "Estado":form.value.estado,
        "Ubicacion":form.value.ubicacion,
        "Fecha_Registro":form.value.registro,
        "Fecha_Salida":"",
        "Costo":form.value.costo,
        "Descripcion":form.value.descripcion,
        "Disponible":form.value.estado=="Bueno",
        "Color":form.value.estado=="Bueno"?"#79a32d":form.value.estado=="Dañado"?"#ffd56c":form.value.estado=="Irreparable"?"#d65656":"",
        "Imagen":url
    })
    })
  }

  
}
