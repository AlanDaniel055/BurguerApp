import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { TabsPage } from './pages/tabs/tabs.page';
import { HomePage } from './pages/tabs/home/home.page';
import { AccountPage } from './pages/tabs/account/account.page';
import { CartPage } from './pages/tabs/cart/cart.page';
import { SearchPage } from './pages/tabs/search/search.page';



export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home', 
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage, 
    children: [
      {
        path: 'home', 
        component: HomePage, 
      },
      {
        path: 'account', 
        component: AccountPage,
      },
      {
        path: 'cart', 
        component: CartPage,
      },
      {
        path: 'search', 
        component: SearchPage,
      },
      {
        path: '', 
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'product-detail',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}


