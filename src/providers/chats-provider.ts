import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class ChatsProvider {

      //GLOBAL
    user: any;

    
    //CHATS 
    chatsObservable: FirebaseListObservable<any>;
    chatsStatic: any;
    openedChatRecipientKey: any;

    recentEndpoint1: FirebaseObjectObservable<any>;
    recentEndpoint2: FirebaseObjectObservable<any>;

    allMessages: FirebaseListObservable<any>;

    //CHAT VIEW
    currentChatRef1: FirebaseListObservable<any>;
    currentChatRef2: FirebaseListObservable<any>;




    constructor(
        public database: AngularFireDatabase, 
        ){
            
        this.allMessages = this.database.list('/messages');
    }
    init(user: any){
        
        user.subscribe((user) => {
            this.user = user;
            this.chatsObservable = this.database.list(`/users/${this.user.$key}/chats`);
        });

         
    }
    createChat(recipient: any){
        // console.log(this.user);
        // console.log(recipient);

        if(this.user.$key === recipient.key){
            return false;
        }
        this.recentEndpoint1 = this.database.object(`/users/${this.user.$key}/chats/${recipient.key}`);
        this.recentEndpoint1.update({
            recipient: {
                name: recipient.name,
                key: recipient.key
            }
        });

      
        this.recentEndpoint2 = this.database.object(`/users/${recipient.key}/chats/${this.user.$key}`);
        this.recentEndpoint2.update({
            recipient: {
                name: this.user.name,
                key: this.user.$key
            }
        });
        
        return true;
    }
    
    getChatsObservable(){
        return this.chatsObservable;
    }
    getChatRefObservable(ref: number): FirebaseListObservable<any>{
        if(ref==1){
            return this.currentChatRef1;
        }else{
            return this.currentChatRef2;
        }
    }

    openChat(recipient){
        console.log(recipient.key);
        console.log(this.user.$key);
        this.currentChatRef1 = this.database.list(`/messages/${this.user.$key},${recipient.key}`);
        this.currentChatRef2 = this.database.list(`/messages/${recipient.key},${this.user.$key}`);

        this.recentEndpoint1 = this.database.object(`/users/${this.user.$key}/chats/${recipient.key}`);
        this.recentEndpoint2 = this.database.object(`/users/${recipient.key}/chats/${this.user.$key}`);

    }
    deleteChat(chat){
        if(this.allMessages==null){
            alert("Error: mensajes nulos");
            return null;
        }
        try {
            this.allMessages.remove(this.user.$key+","+chat.recipient.key);
            this.allMessages.remove(chat.recipient.key+","+this.user.$key);

            this.recentEndpoint1 = this.database.object(`/users/${this.user.$key}/chats/${chat.recipient.key}`);
            this.recentEndpoint2 = this.database.object(`/users/${chat.recipient.key}/chats/${this.user.$key}`);

            this.recentEndpoint1.remove();
            this.recentEndpoint2.remove();
        } catch (error) {
            console.log(error);
        }
        
    }

    pushChatMessage(message: any){
        console.log(message);
        this.currentChatRef1.push(message);
        this.currentChatRef2.push(message);

        this.recentEndpoint1.update({
            last_message: this.user.name+": "+message.message,
        });

        this.recentEndpoint2.update({
            last_message: this.user.name+": "+message.message,
        })
    }
}
