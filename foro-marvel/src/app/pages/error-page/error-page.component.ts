import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
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
