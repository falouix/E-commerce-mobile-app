import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscritPage } from './inscrit.page';

const routes: Routes = [
  {
    path: '',
    component: InscritPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscritPageRoutingModule {}
