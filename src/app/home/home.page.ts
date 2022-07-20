import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  clicktest(id,pageNbr){
    this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
  }
}
