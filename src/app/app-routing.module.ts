import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dostavka', component: DeliveryAndPaymentComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'vacancy', component: VacancyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
