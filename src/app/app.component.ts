import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public currentActive;
  public appPages = [
    { title: 'Inbox', url: '/folder/Home', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  menuactive = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router : Router) {
    this.menuactive[1] = true;
    this.menuactive[2] = false;
    this.menuactive[3] = false;
    this.menuactive[4] = false;
    this.menuactive[5] = false;
  }
  btnmenu(i){
    console.log('btnMenu4');
    this.menuactive[1] = false;
    this.menuactive[2] = false;
    this.menuactive[3] = false;
    this.menuactive[4] = false;
    this.menuactive[5] = false;
    this.menuactive[i] = true;
  }
  btnBack(){
    console.log('clicked');
    history.back();
  }
}
