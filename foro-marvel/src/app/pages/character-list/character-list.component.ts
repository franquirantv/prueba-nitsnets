import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  constructor(private api: ApiService) {}

  // Variables para la paginación
  totalCharacters = 0;
  posicionactual = 0;
  registrosporpagina = 10;

  // Variable para almacenar los personajes
  characters: Character[] = [];
  charactersName: string[] = [];

  // Variable para mostrar el spinner de carga
  loading: boolean = true;

  ngOnInit(): void {
    // Cargamos los personajes al iniciar el componente
    this.getCharacter();
  }

  // Función para obtener los personajes
  getCharacter() {
    this.loading = true;
    this.api
      .getCharacter(this.posicionactual, this.registrosporpagina)
      .subscribe(
        (data: any) => {
          // Comprobamos si estamos en una página vacia, si es así entonces retrocedemos una página si se puede
          if (data.data.results.length === 0) {
            if (this.posicionactual > 0) {
              this.posicionactual =
                this.posicionactual - this.registrosporpagina;
              if (this.posicionactual < 0) {
                this.posicionactual = 0;
              }
              this.getCharacter();
            } else {
              // Si no hay personajes, vaciamos el array y ponemos el total a 0
              this.characters = [];
              this.charactersName = [];
              this.totalCharacters = 0;
            }
          } else {
            // Si hay personajes, los cargamos
            this.loading = false;
            this.characters = data.data.results;
            this.charactersName = data.data.results.name;
            this.totalCharacters = data.data.total;
            //console.log(this.characters);
          }
        },
        (error: any) => {
          // Si hay un error, lo mostramos por consola
          //TODO: Mostrar error en pantalla
          console.log(error);
          this.loading = false;
        }
      );
  }

  // Función para cambiar de página
  cambiarPagina(pagina: number) {
    // Comprobamos que la página no sea menor que 0
    pagina = pagina < 0 ? 0 : pagina;
    // Comprobamos que la página no sea mayor que el total de páginas
    this.posicionactual =
      (pagina - 1) * this.registrosporpagina >= 0
        ? (pagina - 1) * this.registrosporpagina
        : 0;
    this.getCharacter();
  }

  search(event: any) {
    console.log(event);
  }
}
