import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent implements OnInit {
  constructor(private api: ApiService) {}
  loading: boolean = true;
  comics: any[] = [];
  focDate: number[] = [];

  ngOnInit(): void {
    // Cargamos los comics al iniciar el componente
    this.getComics();
    //Get year from a date
    var date = new Date('2015-03-25T12:00:00Z');
    var year = date.getFullYear();
  }

  // Función para obtener los comics más recientes
  getComics() {
    this.loading = true;
    this.api.getComicsOrderedBy('focDate').subscribe(
      (data: any) => {
        const comics = data.data.results;
        console.log(comics);
        this.loading = false;
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
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
