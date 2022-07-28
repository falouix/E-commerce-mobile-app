import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarquesServicesPage } from './marques-services.page';

const routes: Routes = [
  {
    path: '',
    component: MarquesServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarquesServicesPageRoutingModule {}
