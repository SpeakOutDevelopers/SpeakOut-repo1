import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterGenderPage } from '../register-gender/register-gender';
import { EventProvider } from '../../providers/event-provider';
import { isNumeric } from "@angular/common/src/pipes/number_pipe";

/**
 * Generated class for the RegisterNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-name',
  templateUrl: 'register-name.html',
})
export class RegisterNamePage {

  user = {
    first_name: "",
    last_name: ""
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
  }
  passToGender(formData): void {
    if (formData.valid) {
     
      if (formData.value.first_name == ""||formData.value.first_name == null) {
        return null;
      }
       if (formData.value.last_name == ""||formData.value.last_name == null) {
        return null;
      }
      this.user = {
        first_name: formData.value.first_name,
        last_name: formData.value.lastname
      };

      this.navCtrl.push(RegisterGenderPage, {
        user: this.user
      });
  }
  }



    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterNamePage');
    }

  }
