import { Injectable } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';


@Injectable()
export class CentralController {

	constructor(
		public alertCtrl: AlertController
		){

	}

    showAlert(alertmsg:string) {
	    let alert = this.alertCtrl.create({
	        title: 'Alerta',
	        subTitle: alertmsg,
	        buttons: ['OK']
	    });
	    alert.present();
	}
	log(log:any){
		console.log(log);
	}
}