import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserRoutingModule } from './user-routing-module';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';



@NgModule({
  declarations: [
    UserCabinetComponent,
    UserHistoryComponent,
    UserChangePasswordComponent,
    UserFavoriteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
