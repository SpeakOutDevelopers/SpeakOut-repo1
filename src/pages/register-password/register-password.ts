import { CentralController } from '../../controllers/central.controller';
import { RegisterEmailPage } from '../register-email/register-email';
import { Usuario } from '../../commons/entities';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPhotoPage } from '../register-photo/register-photo';

/**
 * Generated class for the RegisterPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-password',
  templateUrl: 'register-password.html',
})
export class RegisterPasswordPage {

  user: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CC: CentralController) {
    this.user = this.navParams.get("user");
  }
   passToPhoto(formData): void {
    if (formData.valid) {
      if (formData.value.password == null) {
        return null;
      }
      if(formData.value.password.length <= 5){
        // alert("La contraseña debe de minimo 6 caracteres");
        this.CC.presentToast("La contraseña debe de minimo 6 caracteres",0); 
        return null;
      }

      this.user.contrasena = formData.value.password;

      this.navCtrl.push(RegisterEmailPage, {
        user: this.user
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPasswordPage');
  }

}
