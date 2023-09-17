import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/15.png',
      title: 'Акція1',
      subtitle:'123'
    };
    this.slides[1] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/21.png',
      title: 'Акція2',
      subtitle:'123'
    }
    this.slides[2] = {
      src: 'https://mapizza.com.ua/wp-content/uploads/2023/05/dostavka-moped.png',
      title: 'Акція3',
      subtitle:'123'
    }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
