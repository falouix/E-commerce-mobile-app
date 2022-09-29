import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchServicesPage } from './search-services.page';

const routes: Routes = [
  {
    path: '',
    component: SearchServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchServicesPageRoutingModule {}
