import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isHidden = false;
  public lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollTop = currentScrollTop;
  }
}
