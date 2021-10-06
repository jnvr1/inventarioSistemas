import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService:AuthService, private navCtrl:NavController) {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        this.navCtrl.navigateForward("principal")
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
