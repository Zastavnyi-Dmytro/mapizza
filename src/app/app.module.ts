import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment/delivery-and-payment.component';
import { DiscountsComponent } from './pages/discounts/discounts/discounts.component';
import { ContactsComponent } from './pages/contacts/contacts/contacts.component';
import { VacancyComponent } from './pages/vacancy/vacancy/vacancy.component';
import { NewsComponent } from './pages/news/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    DeliveryAndPaymentComponent,
    DiscountsComponent,
    ContactsComponent,
    VacancyComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
