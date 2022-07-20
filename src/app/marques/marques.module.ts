import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarquesPageRoutingModule } from './marques-routing.module';

import { MarquesPage } from './marques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarquesPageRoutingModule
  ],
  declarations: [MarquesPage]
})
export class MarquesPageModule {}
