import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/bbdd-local/sqlite.service';
import { Character } from '../../models/character.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-local-character-list',
  templateUrl: './local-character-list.component.html',
  styleUrls: ['./local-character-list.component.css'],
})
export class LocalCharacterListComponent implements OnInit {
  constructor(
    private sql: SqliteService,
    private fb: FormBuilder
  ) {}

  public addCharacterForm = this.fb.group({
    name: ['', Validators.required], //se ponene corchetes si vamos a poner varias validaciones
    description: ['', Validators.required],
    thumbnail: [''],
  });
  imageSrc: string | ArrayBuffer | null = '' || 'assets/no-image.png';

  // Variables para la paginación
  totalCharacters = 0;
  posicionactual = 0;
  registrosporpagina = 10;

  // Variable para almacenar los personajes
  characters: Character[] = [];
  displayCharacters: any[] = [];

  // Variable para mostrar el spinner de carga
  loading: boolean = true;

  ngOnInit(): void {
    // Cargamos los personajes al iniciar el componente
    this.getCharacter();
  }

  // Función para obtener los personajes
  getCharacter() {
    this.loading = true;
    this.sql.getCharacter().subscribe(
      (data: any) => {
        // Comprobamos si estamos en una página vacia, si es así entonces retrocedemos una página si se puede
        // if (data.data.results.length === 0) {
        //   if (this.posicionactual > 0) {
        //     this.posicionactual = this.posicionactual - this.registrosporpagina;
        //     if (this.posicionactual < 0) {
        //       this.posicionactual = 0;
        //     }
        //     this.getCharacter();
        //   } else {
        //     // Si no hay personajes, vaciamos el array y ponemos el total a 0
        //     this.characters = [];
        //     this.totalCharacters = 0;
        //   }
        // } else {
        // Si hay personajes, los cargamos
        this.loading = false;
        this.characters = data.character;
        for (let index = 0; index < data.character.length; index++) {
          let path = data.character[index].thumbnail.split('.')[0];
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

        console.log(this.characters);
        console.log(this.displayCharacters);

        // this.totalCharacters = data.data.total;
        // }
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

  onSubmit() {
    console.log('submit');
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // mostrar la imagen del file en el preview #imageResult
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);

      this.addCharacterForm.patchValue({
        thumbnail: file.name,
      });
    }
  }

  showFileName(event: any) {
    const infoArea = document.getElementById('upload-label');
    let inputEl = event.srcElement;
    if (inputEl.files[0]) {
      let fileName = inputEl.files[0].name;
      if (infoArea !== null) {
        infoArea.textContent = 'Imagen: ' + fileName;
      }
    }
  }

  autoGrow(element: any) {
    element.target.style.height = '5px';
    element.target.style.height = element.target.scrollHeight + 'px';
  }
}
