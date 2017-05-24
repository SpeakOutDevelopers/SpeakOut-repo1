import { Injectable } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class CentralController {

	loading:any;

	constructor(
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController
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
	presentLoading(message: string) {

		this.loading = this.loadingCtrl.create({
			content: message+"...",
		});
		this.loading.present();
	}
	dismissLoading(){
    	this.loading.dismiss();
	}
}