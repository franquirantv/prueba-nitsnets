import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor(private api: ApiService) {}
  loading: boolean = true;
  eventos: any[] = [];

  ngOnInit(): void {
    // Cargamos los eventos al iniciar el componente
    this.getEvents();
  }

  // Función para obtener los eventos, filtrando por los 5 primeros
  // que mayor tiempo se han celebrado o se van a celebrar
  getEvents() {
    this.loading = true;
    this.api.getEvents().subscribe(
      (data: any) => {
        const eventos = data.data.results;
        // console.log('eventos', eventos);
        this.loading = false;
        // Calcular la diferencia de años y agregarla a cada objeto
        eventos.forEach((evento: any) => {
          const startDate = new Date(evento.start);
          const endDate = new Date(evento.end);
          const yearDifference =
            endDate.getFullYear() - startDate.getFullYear();
          evento.yearDifference = yearDifference;
        });

        // Ordenar los objetos en función de la diferencia de años
        eventos.sort((a: any, b: any) => b.yearDifference - a.yearDifference);

        console.log('eventos ordenados', eventos);
        // añadir los 5 primeros al this.eventos
        this.eventos = eventos.slice(0, 5);
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
