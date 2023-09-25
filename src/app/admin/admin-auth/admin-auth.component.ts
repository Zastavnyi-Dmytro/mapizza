import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent {
  public authForm!: FormGroup
  public loginSubscription!: Subscription
  signUpCheck = false

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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
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
        this.router.navigate(['/user-profile'])
      }
      else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin/discounts'])
      }
      this.accountService.isUserLogin$.next(true)
    }, (err => {
      console.log('error', err)
    }))
  }
}
