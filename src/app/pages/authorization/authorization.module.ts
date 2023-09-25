import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { AuthorizationRoutingModule } from './authorization-routing-module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
