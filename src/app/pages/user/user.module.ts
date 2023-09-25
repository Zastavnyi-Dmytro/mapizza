import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserRoutingModule } from './user-routing-module';



@NgModule({
  declarations: [
    UserCabinetComponent,
    UserHistoryComponent,
    UserChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
