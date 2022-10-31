import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SlickCarouselModule,
    SwiperModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
