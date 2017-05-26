import { CentralController } from '../../controllers/central.controller';
import { createNgZone } from '@angular/platform-browser/testing/src/browser_util';
import { Usuario } from '../../commons/entities';
import { RegisterPhotoPage } from '../register-photo/register-photo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPasswordPage } from '../register-password/register-password';

/**
 * Generated class for the RegisterEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-email',
  templateUrl: 'register-email.html',
})
export class RegisterEmailPage {
  user:Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CC: CentralController) {
    this.user = this.navParams.get("user");
  }
  passToPassword(formData): boolean {
    if (formData.valid && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.value.email)) ) {
      this.user.email = formData.value.email;

      this.navCtrl.push(RegisterPhotoPage, {
        user: this.user
      });
      return true;
    }
      
    if (formData.value.email == null) {
      return false;
    }
    this.CC.presentToast("Email invalido",0);
      
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterEmailPage');
  }

}
