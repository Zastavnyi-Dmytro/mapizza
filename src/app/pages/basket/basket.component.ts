import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public total = 0

  currentProduct!:Products
  public basket: Array<Products> = [];

  constructor(
    private orderServive: OrderService,
  ){}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }
  
  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: Products) => total + prod.count * prod.price, 0);
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

  deleteItem(item:Products){
    let basket = JSON.parse(localStorage.getItem('basket') as string)
    for(let i=0;i<basket.length;i++){
      if(basket[i].id == item.id){
        basket.splice(i,1)
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.loadBasket()
    this.orderServive.changeTotal.next(this.total);
    this.orderServive.changeCount.next(basket.length)
  }
}
