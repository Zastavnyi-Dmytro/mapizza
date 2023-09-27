import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  changeBasket = new Subject<boolean>();
  changeTotal = new Subject<number>();
  changeCount = new Subject<number>();

  constructor() { }
}
