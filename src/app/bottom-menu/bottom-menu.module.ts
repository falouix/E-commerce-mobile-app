import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BottomMenuPageRoutingModule } from './bottom-menu-routing.module';

import { BottomMenuPage } from './bottom-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomMenuPageRoutingModule
  ],
  declarations: [BottomMenuPage]
})
export class BottomMenuPageModule {}
