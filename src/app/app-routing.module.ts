import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'bottom-menu',
    loadChildren: () => import('./bottom-menu/bottom-menu.module').then( m => m.BottomMenuPageModule)
  },
  {
    path: 'marques',
    loadChildren: () => import('./marques/marques.module').then( m => m.MarquesPageModule)
  },
  {
    path: 'bouhaha',
    loadChildren: () => import('./bouhaha/bouhaha.module').then( m => m.BouhahaPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'categorie',
    loadChildren: () => import('./categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'categorie/:id/:pageNbr',
    loadChildren: () => import('./categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'categories-services',
    loadChildren: () => import('./dataServices/categories-services/categories-services.module').then( m => m.CategoriesServicesPageModule)
  },
  {
    path: 'products-services',
    loadChildren: () => import('./dataServices/products-services/products-services.module').then( m => m.ProductsServicesPageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'marques-services',
    loadChildren: () => import('./dataServices/marques-services/marques-services.module').then( m => m.MarquesServicesPageModule)
  },
  {
    path: 'productmarque/:id',
    loadChildren: () => import('./productmarque/productmarque.module').then( m => m.ProductmarquePageModule)
  },
  {
    path: 'subcategory',
    loadChildren: () => import('./subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'productmarque1/',
    loadChildren: () => import('./dataServices/productmarque/productmarque.module').then( m => m.ProductmarquePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canLoad: [AuthGuard]  // Check if we should show the introduction or forward to inside
  },
  {
    path: 'inscrit',
    loadChildren: () => import('./inscrit/inscrit.module').then( m => m.InscritPageModule)
  },
  {
    path: 'customer-services',
    loadChildren: () => import('./dataServices/customer-services/customer-services.module').then( m => m.CustomerServicesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'search/:s',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'search-services',
    loadChildren: () => import('./dataServices/search-services/search-services.module').then( m => m.SearchServicesPageModule)
  },
  {
    path: 'addresses',
    loadChildren: () => import('./addresses/addresses.module').then( m => m.AddressesPageModule)
  },
  {
    path: 'ordershistory',
    loadChildren: () => import('./ordershistory/ordershistory.module').then( m => m.OrdershistoryPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'delivery-list/:id_delivery',
    loadChildren: () => import('./delivery-list/delivery-list.module').then( m => m.DeliveryListPageModule)
  },
  {

    path: 'singleaddress/:id',
    loadChildren: () => import('./singleaddress/singleaddress.module').then( m => m.SingleaddressPageModule)
  },
  {
    path: 'payment/:id',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)

  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
