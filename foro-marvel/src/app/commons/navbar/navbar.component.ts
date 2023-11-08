import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarHidden = false;
  prevScrollPos = window.pageYOffset;
  isSidebarOpen: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollPos < currentScrollPos) {
      this.isNavbarHidden = true; // Oculta la barra de navegación al hacer scroll hacia abajo
    } else {
      this.isNavbarHidden = false; // Muestra la barra de navegación al hacer scroll hacia arriba
    }
    this.prevScrollPos = currentScrollPos;
  }

  goSearchbar() {
    document.getElementById('search-bar')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
