import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {UtilService} from "./app.util.service";
import {BookPage} from "../pages/book/book";
import {MusicPage} from "../pages/music/music";
import {MoviePage} from "../pages/movie/movie";
import {CenterPage} from "../pages/center/center";
//每一个app都有一个根模块来控制这个应用的其他部分 在这个模块里 我们把myApp作为根组件，在myApp这个组件里加载我们要在应用中加载的第一个组件
//并且它也是其他组件到此的外壳
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    BookPage,
    MusicPage,
    MoviePage,
    CenterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    BookPage,
    MoviePage,
    MusicPage,
    CenterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
