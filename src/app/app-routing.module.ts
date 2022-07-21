import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
