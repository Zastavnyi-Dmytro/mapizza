import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import { NewsComponent } from './pages/news/news.component';
import { HomeComponent } from './pages/home/home.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { SharedModule } from './shared/shared-module';
import { ProductComponent } from './pages/products/product/product.component';
import { ProductInfoComponent } from './pages/products/product-info/product-info.component';
import { BasketComponent } from './pages/basket/basket.component';


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
    NewsComponent,
    HomeComponent,
    AuthorizationComponent,
    ProductComponent,
    ProductInfoComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    AlertModule,
    CarouselModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
