import { Injectable } from '@angular/core';
import { AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';


@Injectable()
export class CentralController {

	loading:Loading;
	fbUserOnCreation: boolean = false;

	constructor(
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private toastCtrl: ToastController
		){
			this.loading = this.loadingCtrl.create();
		
	}

    showAlert(alertmsg:string) {
		this.presentToast(alertmsg,0);
	    // let alert = this.alertCtrl.create({
	    //     title: 'Alerta',
	    //     subTitle: alertmsg,
	    //     buttons: ['OK']
	    // });
	    // alert.present();
	}
	log(log:any){
		console.log(log);
	}
	presentLoading(message: string) {
		this.presentToast(message, 2000);
		// this.loading.setContent(message);
		// this.loading.present();
	}
	dismissLoading(){
		// this.loading.dismiss();
		
	}
	presentToast(message:string, duration:number) {
		let opts;
		if(duration!=0){
			opts = {
				message: message,
				position: 'bottom',
				duration: duration
			};
		}else{
			opts = {
				message: message,
				position: 'bottom',
				showCloseButton: true,
			};
		}
		let toast = this.toastCtrl.create(opts);
		toast.present();
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