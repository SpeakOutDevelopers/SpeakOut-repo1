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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
  }
  passToPassword(formData): void {
    if (formData.valid) {
      if (formData.value.email == null) {
        return null;
      }

      this.user.email = formData.value.email;

      this.navCtrl.push(RegisterPhotoPage, {
        user: this.user
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterEmailPage');
  }

}
