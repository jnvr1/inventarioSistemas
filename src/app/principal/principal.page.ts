import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private authService:AuthService,
    private navCtrl:NavController) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().then(a=>this.navCtrl.navigateRoot(""))
  }
  goToAlta(){
    this.navCtrl.navigateForward("alta")
  }
  goToInventario(){
    this.navCtrl.navigateForward("inventario")
  }
}
