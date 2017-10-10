import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {BookPageModule} from "../book/book.module";
import {BookPage} from "../book/book";
import {MusicPageModule} from "../music/music.module";
import {MusicPage} from "../music/music";
import {MoviePage} from "../movie/movie";
import {CenterPage} from "../center/center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots:Object[];

  constructor() {
    this.tabRoots = [
      {
        root : BookPage,
        tabTitle : '书籍',
        tabIcon : 'md-book'
      },
      {
        root : MusicPage,
        tabTitle: '音乐',
        tabIcon: 'md-musical-notes'
      },
      {
        root : MoviePage,
        tabTitle: '电影',
        tabIcon: 'md-videocam'
      },
      {
        root : CenterPage,
        tabTitle: '我',
        tabIcon: 'md-paw'
      }
    ]
  }
}
