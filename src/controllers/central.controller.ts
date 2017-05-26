import { Injectable } from '@angular/core';
import {  AlertController, LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class CentralController {

	loading:Loading;
	fbUserOnCreation: boolean = false;

	constructor(
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController
		){
			this.loading = this.loadingCtrl.create();
		
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

		// this.loading.setContent(message);
		// this.loading.present();
	}
	dismissLoading(){
		// this.loading.dismiss();
		
	}
	isFbUserOnCreation():boolean{
		if(this.fbUserOnCreation==null || this.fbUserOnCreation==false || this.fbUserOnCreation==undefined){
			return false;
		}else{
			return true;
		}
	}
	setFbUserOnCreation(val: boolean):void{
		this.fbUserOnCreation = val;
	}
}