import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() {};

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
    }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
