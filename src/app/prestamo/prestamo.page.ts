import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.page.html',
  styleUrls: ['./prestamo.page.scss'],
})
export class PrestamoPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  
  goToPrincipal(){
    this.navCtrl.back()
  }
}
