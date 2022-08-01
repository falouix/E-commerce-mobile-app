import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoryPageRoutingModule } from './subcategory-routing.module';

import { SubcategoryPage } from './subcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoryPageRoutingModule
  ],
  declarations: [SubcategoryPage]
})
export class SubcategoryPageModule {}
