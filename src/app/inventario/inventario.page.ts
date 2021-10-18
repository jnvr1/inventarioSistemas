import { NavController } from '@ionic/angular';
import { DbService } from './../services/db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  items= new Map()
  tipo = []
  marca = [];modelo=[]
  estado = ["Bueno","Dañado","Irreparable"]
  FiltroTipo=[];FiltroModelo=[];FiltroMarca=[];FiltroEstado=[]
  mapaT= new Map();mapaMo= new Map();mapaMa= new Map();mapaE = new Map()
  items1 = new Map()
  constructor(private db:DbService,private navCtrl:NavController) {  }

  async ngOnInit() {
    
    this.items=await this.db.consultar()
    console.log(this.items)

    await this.items.forEach(a=>{
      this.tipo.push(a.Tipo)
      this.marca.push(a.Marca)
      this.modelo.push(a.Modelo)
      }
      )
      this.tipo = [new Set(this.tipo)]
      this.marca = [new Set(this.marca)]
      this.modelo = [new Set(this.modelo)]
      console.log(this.tipo)
      console.log(this.marca)
    this.items1= this.items

  }

  goToPrincipal(){
    this.navCtrl.back()
  }

  verItem(id){
    this.navCtrl.navigateForward("editar",{state: id})
  }

  filtroTipo(){
    this.items1 = new Map()
    if(this.FiltroTipo.length>0){
      this.items.forEach((value,key)=>{
        if(this.FiltroTipo.includes(value.Tipo)){
          this.items1.set(key,value)
          this.mapaT.set(key,value)
        }
      })
    }else{
      this.items1 = this.items 
    }
    
  }
  async filtroMarca(){
    
    console.log(this.mapaT)
    this.items1 = new Map()
    if(this.FiltroMarca.length>0){
      this.mapaT.forEach((value,key)=>{
        if(this.FiltroMarca.includes(value.Marca)){
          this.items1.set(key,value)
          this.mapaMa.set(key,value)
        }
      })
    }else{
      this.items1=this.mapaT
    }
  }
  async filtroModelo(){
    
    this.items1 = new Map()
    if(this.FiltroModelo.length>0){
      this.mapaMa.forEach((value,key)=>{
        if(this.FiltroModelo.includes(value.Modelo)){
          this.items1.set(key,value)
          this.mapaMo.set(key,value)
        }
      })
    }else{
      this.items1 = this.mapaMa
    }
  }
  async filtroEstado(){
    this.items1 = new Map()
    if(this.FiltroEstado.length>0){
      this.mapaMo.forEach((value,key)=>{
        if(this.FiltroEstado.includes(value.Estado)){
          this.items1.set(key,value)
          this.mapaE.set(key,value)
        }
      })
    }else{
      this.items1 = this.mapaMo
    }
    
  }
  

}
