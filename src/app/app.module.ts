import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { ChatsPage } from '../pages/chats/chats';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddEventPage } from '../pages/add-event-page/add-event-page';
import { ChatViewPage } from '../pages/chat-view-page/chat-view-page';
import { ConfigurationPage } from '../pages/configuration-page/configuration-page';
import { LoginPage } from '../pages/login-page/login-page';
import { ModifiyProfilePage } from '../pages/modifiy-profile-page/modifiy-profile-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { UserProfilePage } from '../pages/user-profile-page/user-profile-page';

import { UserProvider } from '../providers/user-provider';
import { ChatsProvider } from '../providers/chats-provider';
import { ConfigurationProvider } from '../providers/configuration-provider';
import { EventProvider } from '../providers/event-provider';

import { CentralController } from '../controllers/central.controller';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyAlCUzN3YQD_pZXMUn1UFau3ttTE7lYB_o",
  authDomain: "speakout-d5b56.firebaseapp.com",
  databaseURL: "https://speakout-d5b56.firebaseio.com",
  projectId: "speakout-d5b56",
  storageBucket: "speakout-d5b56.appspot.com",
  messagingSenderId: "184791896027"
};

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    ChatsPage,
    HomePage,
    TabsPage,
    AddEventPage,
    ChatViewPage,
    ConfigurationPage,
    LoginPage,
    ModifiyProfilePage,
    SignupPage,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    ChatsPage,
    HomePage,
    TabsPage,
    AddEventPage,
    ChatViewPage,
    ConfigurationPage,
    LoginPage,
    ModifiyProfilePage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    ChatsProvider,
    ConfigurationProvider,
    EventProvider,
    CentralController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
