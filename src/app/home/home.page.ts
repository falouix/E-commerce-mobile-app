import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router : Router, public storage: Storage) { }

  ngOnInit() {
  }
  clicktest(id,pageNbr){

    this.setStorageValue('currentCategoryId',id);
    this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
  }

  
  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    console.log('set string in storage:' + result);
    return true;
    } catch (reason) {
    console.log(reason);
    return false;
    }
  }
}
