import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import { NewsComponent } from './pages/news/news.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { ProductComponent } from './pages/products/product/product.component';
import { ProductInfoComponent } from './pages/products/product-info/product-info.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dostavka', component: DeliveryAndPaymentComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'discounts/:name/:id', component: DiscountInfoComponent},
  { path: 'contacts', component: ContactsComponent },
  { path: 'vacancy', component: VacancyComponent },
  { path: 'news', component: NewsComponent},
  { path: 'auth', loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'user', canActivate: [authGuard], loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'products/:category', component: ProductComponent },
  { path: 'products/:category/:id', component: ProductInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
