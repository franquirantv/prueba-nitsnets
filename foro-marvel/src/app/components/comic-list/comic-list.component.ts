import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/store/shared/shared.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { SharedState } from 'src/app/store/shared/shared.state';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css'],
})
export class ComicListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private store: Store<SharedState>
  ) {}
  loading: boolean = true;
  showLoading$: Observable<boolean> | undefined;
  comics: any[] = [];

  ngOnInit(): void {
    // Cargamos los comics al iniciar el componente
    this.showLoading$ = this.store.select(getLoading);
    this.getComics();
  }

  // Función para obtener los comics más recientes
  getComics() {
    // this.loading = true;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.api.getComicsOrderedBy('focDate').subscribe(
      (data: any) => {
        const comics = data.data.results;
        // this.loading = false;
        this.store.dispatch(setLoadingSpinner({ status: false }));
        // Si el año de focDate (comics.dates[1].date) es menor o igual al año actual, lo añadimos al array
        // Si la portada (comics.thumbnail.path) contiene 'image_not_available', no lo añadimos al array
        for (let i = 0; i < comics.length; i++) {
          if (
            parseInt(comics[i].dates[1].date.substring(0, 4)) <=
              new Date().getFullYear() &&
            !comics[i].thumbnail.path.includes('image_not_available')
          ) {
            this.comics.push(comics[i]);
          }
        }
        console.log(comics);
      },
      (error: any) => {
        console.log(error);
        // this.loading = false;
        this.store.dispatch(setLoadingSpinner({ status: false }));
      }
    );
  }
}
