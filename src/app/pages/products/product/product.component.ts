import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public userProducts:Array<Products> = []
  public currentProduct!:Products
  private eventSubscription!:Subscription

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
    this.loadProducts()
  }

  loadProducts():void{
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
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
