import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discounts } from 'src/app/shared/interface';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent {
  public discountId: string=''
  public currentDiscount!:Discounts

  constructor(
    private discountsBase:DiscountsService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.discountId = this.route.snapshot.paramMap.get('id')!;
    this.getDiscount()
  }


  getDiscount():void{
    this.discountsBase.getOneDiscount(this.discountId).subscribe(data=> {
      this.currentDiscount = data as Discounts
    })
  }
}
