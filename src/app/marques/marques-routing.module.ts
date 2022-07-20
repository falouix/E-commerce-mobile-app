import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarquesPage } from './marques.page';

const routes: Routes = [
  {
    path: '',
    component: MarquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarquesPageRoutingModule {}
