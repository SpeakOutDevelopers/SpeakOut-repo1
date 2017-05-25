import { Usuario } from '../../commons/entities';
import { RegisterLanguagePage } from '../register-language/register-language';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterEmailPage } from '../register-email/register-email';

/**
 * Generated class for the RegisterAgePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-age',
  templateUrl: 'register-age.html',
})
export class RegisterAgePage {
  user: Usuario
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.token = this.navParams.get("token");
  }

  passToEmail(formData): void {
    if (formData.valid) {
      if (formData.value.age == null) {
        return null;
      }
      this.user.edad = formData.value.age;
      
      this.navCtrl.push(RegisterLanguagePage, {
        user: this.user,
        token: this.token
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterAgePage');
  }

}
