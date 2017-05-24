import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterLanguagePage } from '../register-language/register-language';

/**
 * Generated class for the RegisterPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-photo',
  templateUrl: 'register-photo.html',
})
export class RegisterPhotoPage {
  user = {
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    photo: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.user.photo = "";
  }
  passToLanguage(formData): void {
    if (formData.valid) {
       if (formData.value.photo == null) {
        return null;
      }

      this.user.photo = "http://emprendeunblog.com/wp-content/uploads/2014/11/avatar.png";

      this.navCtrl.push(RegisterLanguagePage, {
        user: this.user
      });
    }
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPhotoPage');
    }

  }
