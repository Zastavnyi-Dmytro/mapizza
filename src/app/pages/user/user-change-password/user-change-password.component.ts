import { Component } from '@angular/core';
import { Auth, updatePassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent {
  public newPass!: FormGroup

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initNewPassForm()
  }

  initNewPassForm(): void {
    this.newPass = this.fb.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  changePassword() {
    const user = this.auth.currentUser;
    const newPassword = this.newPass.get('newPassword')?.value;
    const confirmPassword = this.newPass.get('confirmPassword')?.value;
    if (user && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        let snackBarRef = this.snackBar.open('Пароль не співпадає', 'Закрити');
      } else {
        updatePassword(user, newPassword).then(() => {
          let snackBarRef = this.snackBar.open('Дані змінені', 'Закрити');
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      console.error('Поля не заповнені або користувач не ввійшов в систему.');
    }
  }
}
