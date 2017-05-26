import { CentralController } from '../../controllers/central.controller';
import { UserProvider } from '../../providers/user-provider';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatsProvider } from '../../providers/chats-provider';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Content, ViewController } from 'ionic-angular';

/**
 * Generated class for the ChatViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-view-page',
  templateUrl: 'chat-view-page.html',
})
export class ChatViewPage {
  
  message: string;
  user:any;
  destinatario:string;
  messages:any;  
  @ViewChild(Content) content: Content;

  constructor(
    public nav:NavController, 
    public  navParams:NavParams, 
    public chatsProvider:ChatsProvider, 
    public userProvider:UserProvider,
    public viewCtrl: ViewController,
    public CC: CentralController
    ) {
      this.userProvider.getCurrentUserObservable().subscribe((user)  => {
        this.user = user;
        // this.CC.dismissLoading();
      });

      this.destinatario = navParams.get('destinatario');
      console.log("DESTINATARIO: ", this.destinatario);
      
      
      this.chatsProvider.getChatRefObservable(1).subscribe((messages) => {
        this.messages = messages;
      });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }


  sendMessage() {
    
    if(this.message) {
      let msg = {
          from: this.user.$key,
          nombre_destinatario: this.user.nombre,
          message: this.message
      };
      this.chatsProvider.pushChatMessage(msg);
      this.message = "";
    }
  }
  close(): void {
    this.viewCtrl.dismiss();
  }


}
