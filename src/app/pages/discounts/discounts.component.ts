import { Component } from '@angular/core';
import { Discounts } from 'src/app/shared/interface';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent {
  constructor(
    private discountsBase:DiscountsService
  ) { }

  ngOnInit(): void {
    this.getDiscounts()
  }

  public userDiscounts:Array<Discounts> = []

  getDiscounts():void{
    this.discountsBase.getDiscounts().subscribe(data=> {
      this.userDiscounts = data as Discounts[]
    })
  }

}
