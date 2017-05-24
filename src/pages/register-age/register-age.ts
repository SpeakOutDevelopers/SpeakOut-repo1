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
  user = {
    first_name: "",
    last_name: "",
    gender: "",
    age: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.user.age = "";
  }

  passToEmail(formData): void {
    if (formData.valid) {
      if (formData.value.age == null) {
        return null;
      }
      this.user.age = formData.value.age;
      

      this.navCtrl.push(RegisterEmailPage, {
        user: this.user
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterAgePage');
  }

}