import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(
    private productService: ProductsService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){  
    this.eventSubscription = this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.loadProducts()
      }
    })
  }

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/15.png',
      title: '-15% на самовивіз!',
      subtitle:'Забирай замовлення самостійно з наших піцерій та отримуй знижку 15%!'
    };
    this.slides[1] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/21.png',
      title: 'Акція 2+1!',
      subtitle:'Замовляй 3 піци та отримуй одну з них безкоштовно!'
    }
    this.slides[2] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/dostavka-moped.png',
      title: 'Середній час доставки 29 хв!',
      subtitle:'*у жовту зону до 59 хв'
    };
    this.loadProducts()
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  public userProducts:Array<Products> = []
  public activeRolls = false
  public currentProduct!:Products
  private eventSubscription!:Subscription

  loadProducts():void{
    const categoryName = 'pizza';
    this.productService.getProductsByCategory(categoryName).then(data=>{
      this.userProducts = data.products
    })
  }

  addToBasket(product: Products): void {
    let basket: Array<Products> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    }
    else {
      basket.push(product);
    }
    let test = localStorage.getItem('basket')
    if (test !== null && JSON.parse(test).length === 0) {
      localStorage.clear()
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
    this.orderService.changeCount.next(basket.length)
  }

  productCount(product:Products, value:boolean):void{
    if(value){
      ++product.count
    }
    else if(!value&&product.count>1){
      --product.count
    }
  }
}
