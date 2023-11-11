import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { setLoadingSpinnerForEvents } from 'src/app/store/shared/shared.action';
import { getLoadingEvents } from 'src/app/store/shared/shared.selector';
import { SharedState } from 'src/app/store/shared/shared.state';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private store: Store<SharedState>
  ) {}

  showLoading$: Observable<boolean> | undefined;
  eventos: any[] = [];

  ngOnInit(): void {
    // Cargamos los eventos al iniciar el componente
    this.showLoading$ = this.store.select(getLoadingEvents);
    this.getEvents();
  }

  // Función para obtener los eventos, filtrando por los 5 primeros
  // que mayor tiempo se han celebrado o se van a celebrar
  getEvents() {
    this.store.dispatch(setLoadingSpinnerForEvents({ status: true }));
    this.api.getEvents().subscribe(
      (data: any) => {
        const eventos = data.data.results;
        // console.log('eventos', eventos);
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

        // añadir los 5 primeros al this.eventos
        this.eventos = eventos.slice(0, 5);
        console.log('eventos', this.eventos);
        this.store.dispatch(setLoadingSpinnerForEvents({ status: false })); // Finalizar carga
      },
      (error: any) => {
        console.log(error);
        this.store.dispatch(setLoadingSpinnerForEvents({ status: false })); // Finalizar carga
      }
    );
  }
}
