import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BouhahaPage } from './bouhaha.page';

const routes: Routes = [
  {
    path: '',
    component: BouhahaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BouhahaPageRoutingModule {}
