import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public currentProduct!: Products
  public productId: string=''

  constructor(
    private productService: ProductsService,
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProduct()
  }

  getProduct(): void {
    this.productService.getOneProduct(this.productId).subscribe(data => {
      this.currentProduct = data as Products
    })
  }

  productCount(product: Products, value: boolean): void {
    if (value) {
      ++this.currentProduct.count
    }
    else if (!value && product.count > 1) {
      --this.currentProduct.count
    }
  }

  addToBasket(product: Products): void {
    let basket: Array<Products> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
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
}
