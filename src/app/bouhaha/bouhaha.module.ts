import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BouhahaPageRoutingModule } from './bouhaha-routing.module';

import { BouhahaPage } from './bouhaha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BouhahaPageRoutingModule
  ],
  declarations: [BouhahaPage]
})
export class BouhahaPageModule {}
