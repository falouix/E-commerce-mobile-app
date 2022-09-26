import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public storage: Storage,
    private router:Router) { }
    ngOnDestroy(){
      
    }
  async ngOnInit() {
    await this.storage.clear();
    setTimeout(function(){window.location.reload()}, 500);
    this.router.navigateByUrl(`/home`);
    return;
  } 
    customerLogout(){
      console.log('weshould logout here');
    }
}
