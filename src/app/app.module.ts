import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
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
import { Geolocation } from '@ionic-native/geolocation';

import { CentralController } from '../controllers/central.controller';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Facebook } from '@ionic-native/facebook';


import {IntroPage} from '../pages/intro/intro';
import {RegisterNamePage} from '../pages/register-name/register-name';
import {RegisterGenderPage} from '../pages/register-gender/register-gender';
import {RegisterAgePage} from '../pages/register-age/register-age';
import {RegisterEmailPage} from '../pages/register-email/register-email';
import {RegisterPasswordPage} from '../pages/register-password/register-password';
import {RegisterPhotoPage} from '../pages/register-photo/register-photo';
import {RegisterLanguagePage} from '../pages/register-language/register-language';
import {LocationFilterPage} from '../pages/location-filter/location-filter';


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
import { ExpandableHeader } from "../components/expandable-header/expandable-header";

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
    UserProfilePage,
    ExpandableHeader,
    IntroPage,
    RegisterNamePage,
    RegisterGenderPage,
    RegisterAgePage,
    RegisterEmailPage,
    RegisterPasswordPage,
    RegisterPhotoPage,
    RegisterLanguagePage,
    LocationFilterPage,

    
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
    UserProfilePage,
    IntroPage,
    RegisterNamePage,
    RegisterGenderPage,
    RegisterAgePage,
    RegisterEmailPage,
    RegisterPasswordPage,
    RegisterPhotoPage,
    RegisterLanguagePage,
    LocationFilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    ChatsProvider,
    ConfigurationProvider,
    EventProvider,
    Geolocation,
    CentralController,
    AngularFireAuth,
    AngularFireDatabase,
    Facebook,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
