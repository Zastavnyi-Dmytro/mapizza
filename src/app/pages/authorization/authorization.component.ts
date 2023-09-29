import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, docData, doc, setDoc } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  public authForm!: FormGroup
  public loginSubscription!: Subscription
  signUpCheck = false
  checkPassword = false

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore
  ) { }

  ngOnInit(): void {
    this.initAuthForm()
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      birthday:[null]
    })
  }

  login() {
    const { email, password } = this.authForm.value
    this.loginBase(email, password).then(() => {
      console.log('login done')
      this.authForm.reset()
    }).catch(err => {
      console.log('login error', err)
    })
  }

  async loginBase(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password)
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/user/cabinet'])
      }
      else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin/discounts'])
      }
      this.accountService.isUserLogin$.next(true)
    }, (err => {
      console.log('error', err)
    }))
  }

  openSignUp(){
    this.signUpCheck = !this.signUpCheck
  }

  signUp(){
    const { email, password } = this.authForm.value
    this.emailSignUp(email,password).then(()=>{
      console.log('signUp done')
      this.authForm.reset()
      this.signUpCheck = false
      this.loginBase(email,password)
    },(err)=>{
      console.log('signUp error', err)
    })
  }

  async emailSignUp(email:string, password:string):Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password)
    const user = {
      email: credential.user.email,
      firstName: this.authForm.value.firstName,
      lastName: this.authForm.value.lastName,
      phoneNumber: this.authForm.value.phoneNumber,
      orders: [],
      role: 'USER',
      birthday: this.authForm.value.birthday
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
  }

  checkConfirmPassword(){
    this.checkPassword = this.password.value === this.confirmPassword.value;
    if(this.password.value!==this.confirmPassword.value){
      this.authForm.controls['confirmPassword'].setErrors({
        matchError: 'Пароль не співпадає'
      })
    }
  }

  get password(): AbstractControl {
    return this.authForm.controls['password']
  }

  get confirmPassword(): AbstractControl {
    return this.authForm.controls['confirmPassword']
  }

  checkVisibilityControl(control:string, name: string):boolean| null{
    return this.authForm.controls[control].errors?.[name]
  }
}
