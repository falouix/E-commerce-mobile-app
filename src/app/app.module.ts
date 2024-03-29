import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderPipe } from './header.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent, HeaderPipe],
  imports: [SlickCarouselModule,BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [InAppBrowser,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
