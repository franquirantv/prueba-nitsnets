import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Reiniciamos el scroll al cambiar de página
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Cuando se completa la navegación, reinicia la posición del scroll
        window.scrollTo(0, 0);
      }
    });
  }
}
