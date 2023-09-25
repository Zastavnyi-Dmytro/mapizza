import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Products } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { BasketComponent } from 'src/app/pages/basket/basket.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isHidden = false;
  public lastScrollTop = 0;
  isLogin = false
  loginUrl = ''
  loginPage = ''
  burgerSwitch = false
  public total = 0

  currentProduct!:Products
  public basket: Array<Products> = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private orderServive: OrderService,
  ){}

  ngOnInit(): void {
    this.checkLogin();
    this.checkUpdateUserLogin();
    this.loadBasket();
    this.updateBasket();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollTop = currentScrollTop;
  }

  checkLogin(){
    let user = JSON.parse(localStorage.getItem('currentUser') as string)
    if(user && user.role === "ADMIN"){
      this.isLogin = true
      this.loginUrl = 'admin/discounts'
      this.loginPage = 'Admin'
    }
    else if(user && user.role === "USER"){
      this.isLogin = true
      this.loginUrl = 'user-profile/info'
      this.loginPage = 'User'
    }
    else{
      this.isLogin = false
      this.loginUrl = ''
      this.loginPage = ''
    }
  }

  checkUpdateUserLogin(){
    this.accountService.isUserLogin$.subscribe(()=>{
      this.checkLogin()
    })
  }

  logout(){
    this.router.navigate([''])
    localStorage.removeItem('currentUser')
    this.accountService.isUserLogin$.next(true)
  }

  openLoginDialog(){
    this.dialog.open(AuthorizationComponent, {
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }

  openBasket():void{
    this.dialog.open(BasketComponent, {
      panelClass: 'basket-dialog',
      autoFocus: false,
      position:{
        top:'15px',
        right:'15px',
      }
    })
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    if(this.basket.length <= 0){
      this.total = 0
    }
    else{
      this.total = this.basket
      .reduce((total: number, prod: Products) => total + prod.count * prod.price, 0);
    }
  }

  updateBasket(){
    this.orderServive.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }

  productCount(product:Products, value:boolean):void{
    if(value){
      ++product.count
    }
    else if (!value && product.count > 0){
      --product.count
    }
    this.total = this.basket
      .reduce((total: number, prod: Products) => total + prod.count * prod.price, 0);
  }


}
