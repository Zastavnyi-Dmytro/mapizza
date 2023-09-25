import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared-module';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';



@NgModule({
  declarations: [
    AdminAuthComponent,
    AdminDiscountsComponent,
    AdminCategoryComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
