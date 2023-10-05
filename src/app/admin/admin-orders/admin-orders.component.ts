import { Component } from '@angular/core';
import { Order } from 'src/app/shared/interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  editMode = false
  editId!: number | string
  panelOpenState = false;

  public adminOrders: Array<Order> = []


  constructor(
    public ordersBase: OrderService
  ) { }
  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.ordersBase.getOrders().subscribe(data=>{
      this.adminOrders = data as Order[]
    })
  }

  deleteDiscount(order: Order): void {
    this.ordersBase.delete(order.id as string).then(() => {
      this.getOrders()
    })
  }

  completeOrder(order:Order){
    this.ordersBase.edit(order.status, order.id as string).then(() => {
      console.log('Змінено')
      
    })
  }
}
