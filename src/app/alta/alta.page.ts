import { DbService } from './../services/db.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  
  ionicForm: FormGroup;
  defaultDate = new Date().toUTCString();
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private db:DbService,
    private alertCtrl: AlertController,
    private navCtrl:NavController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['', [Validators.required, Validators.minLength(2)]],
      ns: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', [Validators.required, Validators.minLength(2)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2)]],
      registro: [this.defaultDate],
      costo: ['', [Validators.required, Validators.minLength(2)]],
      descripcion:['']
    })
  }

  alta(){
    if(this.ionicForm.valid){
      this.db.alta(this.ionicForm).then(a=>{
        let alert = this.alertCtrl.create({
          message: 'Agregado satisfactoriamente',
          buttons: [{
            text:"Volver a agregar",
            handler:()=>{
              this.alertCtrl.create({
                message:"Esta a punto de agregar otro objeto con las mismas especificaciones",
                buttons:[{
                  text:"Agregar",
                  handler:()=>{
                    this.alta()
                  }
                },
                {
                  text:"Cancelar",
                  role:"Cancel",
                  handler:()=>{
                    this.ionicForm.reset()
                    this.ionicForm.controls["descripcion"].setValue(" ") 
                    this.ionicForm.controls["registro"].setValue(new Date().toISOString())
                  }
                }
              ]
              }).then(alert=>alert.present())
            }
          },
          {
            text:"Limpiar",
            handler:()=>{
              this.ionicForm.reset()
              this.ionicForm.controls["descripcion"].setValue(" ") 
              this.ionicForm.controls["registro"].setValue(new Date().toISOString())
            }
          }
        ]
        }).then(a=>{
          a.present()
          
        })
      })
    }else{
      console.log(this.ionicForm)
    }
  }

  goToPrincipal(){
    this.navCtrl.back()
  }

}
