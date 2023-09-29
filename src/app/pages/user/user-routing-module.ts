import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { authGuard } from 'src/app/shared/guards/auth/auth.guard';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';


const routes: Routes = [
    {path:'cabinet', component: UserCabinetComponent, canActivate:[authGuard]},
    {path:'history', component: UserHistoryComponent, canActivate:[authGuard]},
    {path:'change-password', component: UserChangePasswordComponent, canActivate:[authGuard]},
    {path:'favorite', component: UserFavoriteComponent, canActivate:[authGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }