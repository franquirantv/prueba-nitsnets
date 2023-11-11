import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedState } from '../../store/shared/shared.state';
import { Store } from '@ngrx/store';
import { getLoadingCharacters } from 'src/app/store/shared/shared.selector';
import { setLoadingSpinnerForCharacters } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private store: Store<SharedState>
  ) {}

  // Variables para la paginación
  totalCharacters = 0;
  posicionactual = 0;
  registrosporpagina = 10;

  // Variable para almacenar los personajes
  characters: Character[] = [];
  charactersName: string[] = [];
  comics: any[] = [];
  eventos: any[] = [];

  // Variable para mostrar el spinner de carga
  showLoading$: Observable<boolean> | undefined;

  // Variable para el buscador
  searchTerm: string = '';

  ngOnInit(): void {
    // Cargamos los personajes al iniciar el componente
    this.showLoading$ = this.store.select(getLoadingCharacters);

    this.getCharacter();
  }

  // Función para obtener los personajes
  getCharacter() {
    this.store.dispatch(setLoadingSpinnerForCharacters({ status: true })); // Iniciar carga
    this.api
      .getCharacter(
        this.posicionactual,
        this.registrosporpagina,
        this.searchTerm
      )
      .subscribe(
        (data: any) => {
          const characters = data.data.results;
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
              this.store.dispatch(
                setLoadingSpinnerForCharacters({ status: false })
              ); // Finalizar carga
            }
          } else {
            // Si hay personajes, los cargamos
            console.log(characters);
            this.store.dispatch(
              setLoadingSpinnerForCharacters({ status: false })
            ); // Finalizar carga
            this.characters = characters;
            this.charactersName = characters.name;
            this.totalCharacters = data.data.total;
          }
        },
        (error: any) => {
          // Si hay un error, lo mostramos por consola
          //TODO: Mostrar error en pantalla
          console.log(error);
          this.store.dispatch(
            setLoadingSpinnerForCharacters({ status: false })
          ); // Finalizar carga
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

  onSearch(searchTerm: string): void {
    console.log(`Buscando: ${searchTerm}`);
    this.searchTerm = searchTerm;
    this.getCharacter();
  }
}
