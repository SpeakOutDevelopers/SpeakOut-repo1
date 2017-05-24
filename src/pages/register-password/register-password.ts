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
  user = {
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.user.password = "";
  }
   passToPhoto(formData): void {
    if (formData.valid) {
      if (formData.value.password == null) {
        return null;
      }

      this.user.password = formData.value.password;

      this.navCtrl.push(RegisterPhotoPage, {
        user: this.user
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPasswordPage');
  }

}
