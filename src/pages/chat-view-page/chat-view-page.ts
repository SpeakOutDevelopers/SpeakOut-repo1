import { CentralController } from '../../controllers/central.controller';
import { ViewController } from 'ionic-angular/es2015';
import { UserProvider } from '../../providers/user-provider';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatsProvider } from '../../providers/chats-provider';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

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
  recipient:string;
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
      this.CC.presentLoading("Espera");
      this.userProvider.getCurrentUserObservable().subscribe((user)  => {
        this.user = user;
        this.CC.dismissLoading();
      });

      this.recipient = navParams.get('recipient');
      
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
          recipient_name: this.user.name,
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
