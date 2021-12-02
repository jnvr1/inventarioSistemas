import { Validators } from '@angular/forms';
import { DbService } from './../services/db.service';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  ionicForm:FormGroup
  isSubmitted = false
  id
  plat
  files: Observable<FILE[]>;

  
  constructor(public formBuilder: FormBuilder, private db:DbService,
    private alertCtrl: AlertController, public router: Router, private platform:Platform,
    private navCtrl:NavController) {
      if (router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state;
      }
      this.plat=this.platform.is("android")
      
     }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['', [Validators.required, Validators.minLength(2)]],
      ns: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', [Validators.required, Validators.minLength(2)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2)]],
      registro: [''],
      costo: ['', [Validators.required, Validators.minLength(2)]],
      descripcion:['']
    })
    this.getData()
  }

  async getData(){
    let response = await this.db.getItem(this.id)
    this.ionicForm.controls["tipo"].setValue(response.Tipo)
    this.ionicForm.controls["marca"].setValue(response.Marca)
    this.ionicForm.controls["modelo"].setValue(response.Modelo)
    this.ionicForm.controls["ns"].setValue(response.NS)
    this.ionicForm.controls["estado"].setValue(response.Estado)
    this.ionicForm.controls["ubicacion"].setValue(response.Ubicacion)
    this.ionicForm.controls["registro"].setValue(response.Fecha_Registro)
    this.ionicForm.controls["costo"].setValue(response.Costo)
    this.ionicForm.controls["descripcion"].setValue(response.Descripcion)
  }
  editar(){

  }

  fileUpload(event){
    const file = event.target.files.item(0)

      if (file.type.split('/')[0] !== 'image') { 
        console.log('File type is not supported!')
        return;
      }
      const fileStoragePath = `Inventario/${new Date().getTime()}_${file.name}.jpg`;
      this.db.editItem(this.id,this.ionicForm,fileStoragePath,file)
  }

  goToPrincipal(){
    this.navCtrl.back()
  }

}
