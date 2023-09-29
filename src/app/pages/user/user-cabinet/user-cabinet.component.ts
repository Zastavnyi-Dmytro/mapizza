import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent {
  public user!:User;
  public userValue!: FormGroup
  editId!: number | string
  

  ngOnInit(): void {
    this.getUser()
    this.initUserForm()
  }

  constructor(
    private fb: FormBuilder,
    public accountBase:AccountService,
    private snackBar: MatSnackBar
  ) {
    
  }

  getUser(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    this.accountBase.getOneUser(currentUser.uid).subscribe(data =>{
      this.user = data as User
      this.initUserValue()
    })
  }

  initUserForm(): void {
    this.userValue = this.fb.group({
      firstName:[null, Validators.required],
      lastName:[null, Validators.required],
      birthday:[null, Validators.required],
      email:[null, Validators.required],
      phoneNumber:[null, Validators.required]
    })
  }

  initUserValue(): void {
    this.userValue.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthday:this.user.birthday,
      email: this.user.email,
      phoneNumber:this.user.phoneNumber
    })
    this.editId = this.user.id
  }

  editUserValue(){
    this.accountBase.edit(this.userValue.value, this.editId as number).then(() => {
      let snackBarRef = this.snackBar.open('Дані змінені', 'Закрити');
    })
  }
}
