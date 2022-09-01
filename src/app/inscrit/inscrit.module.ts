import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscritPageRoutingModule } from './inscrit-routing.module';

import { InscritPage } from './inscrit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscritPageRoutingModule
  ],
  declarations: [InscritPage]
})
export class InscritPageModule {}
