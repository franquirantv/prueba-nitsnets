import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/bbdd-local/sqlite.service';
import { Character } from '../../models/character.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-local-character-list',
  templateUrl: './local-character-list.component.html',
  styleUrls: ['./local-character-list.component.css'],
})
export class LocalCharacterListComponent implements OnInit {
  constructor(private sql: SqliteService) {}

  // Variables para la paginación
  totalCharacters = 0;
  posicionactual = 0;
  registrosporpagina = 10;

  // Variable para almacenar los personajes
  characters: Character[] = [];
  displayCharacters: any[] = [];

  // Variable para mostrar el spinner de carga
  showLoading$: Observable<boolean> | undefined;

  numPersonajesMostrados = 10;

  searchTerm: string = '';

  ngOnInit(): void {
    // Cargamos los personajes al iniciar el componente
    this.getCharacter();
  }

  // Función para obtener los personajes
  getCharacter() {
    this.sql
      .getCharacter(
        this.posicionactual,
        this.numPersonajesMostrados,
        this.searchTerm
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          // Comprobamos si estamos en una página vacia, si es así entonces retrocedemos una página si se puede
          if (data.character.length === 0) {
            console.log('No hay personajes');
            console.log('Posicion actual: ' + this.posicionactual);
            if (this.posicionactual > 0) {
              this.posicionactual =
                this.posicionactual - this.registrosporpagina;
              if (this.posicionactual < 0) {
                this.posicionactual = 0;
              }
              this.getCharacter();
            } else {
              console.log('No hay personajes');
              // Si no hay personajes, vaciamos el array y ponemos el total a 0
              this.characters = [];
              this.totalCharacters = 0;
              this.displayCharacters = [];
            }
          } else {
            // Si hay personajes, los cargamos

            this.characters = data.character;
            this.totalCharacters = data.total;
            this.displayCharacters = []; //Reseteamos el array de personajes a mostrar antes de rellenarlo
            for (let index = 0; index < data.character.length; index++) {
              let path =
                'assets/uploads/' +
                data.character[index].thumbnail.split('.')[0];
              let extension = data.character[index].thumbnail.split('.')[1];
              this.displayCharacters[index] = {
                id: data.character[index].ID,
                name: data.character[index].name,
                description: data.character[index].description,
                thumbnail: {
                  path: path,
                  extension: extension,
                },
                modified: data.character[index].modified,
              };
            }
          }
        },
        (error: any) => {
          // Si hay un error, lo mostramos por consola
          //TODO: Mostrar error en pantalla
          console.log(error);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se han podido cargar los personajes. Inténtelo de nuevo más tarde.',
          });
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
