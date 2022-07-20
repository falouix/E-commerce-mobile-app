import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BottomMenuPage } from './bottom-menu.page';

const routes: Routes = [
  {
    path: '',
    component: BottomMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomMenuPageRoutingModule {}
