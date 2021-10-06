import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase  from "firebase" 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navCtrl:NavController) {
    firebase.default.auth().onAuthStateChanged(user=>{
      if(user){
        this.navCtrl.navigateRoot("principal")
      }else{
        this.navCtrl.navigateRoot("")
      }
    })
  }
}
