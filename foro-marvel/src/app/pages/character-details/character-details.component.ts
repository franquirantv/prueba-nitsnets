import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { SqliteService } from 'src/app/services/bbdd-local/sqlite.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: ActivatedRoute,
    private sql: SqliteService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  character: any;
  comics: any;
  events: any;
  urls: any;
  series: any;
  loading: boolean = true;
  isLocalCharacter: boolean = false;
  fileUploaded: File = new File([], '');

  editCharacterForm = this.fb.group({
    name: ['', Validators.required], //se ponene corchetes si vamos a poner varias validaciones
    description: [''],
    // thumbnail: [new File([], '')],
  });

  imageSrc: string | ArrayBuffer | null = '' || 'assets/uploads/no-image.png';

  submitted: boolean = false;

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    this.loadCharacter(id);
  }

  loadCharacter(id: number) {
    this.isLocalCharacter = id < 1000 ? true : false;

    if (this.isLocalCharacter) {
      this.sql.getCharacterById(id).subscribe(
        (data: any) => {
          // console.log(data);
          this.character = data.row;
          this.character.thumbnail =
            'assets/uploads/' + this.character.thumbnail;
          this.loadFormData(data);
          // this.comics = this.character.comics.items;
          // this.events = this.character.events.items;
          // this.urls = this.character.urls;
          // this.series = this.character.series.items;
          this.loading = false;
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.api.getCharacterById(id).subscribe(
        (data: any) => {
          console.log(data.data.results[0]);
          this.character = data.data.results[0];
          this.comics = this.character.comics.items;
          this.events = this.character.events.items;
          this.urls = this.character.urls;
          this.series = this.character.series.items;
          this.loading = false;
        },
        (error: any) => {
          //TODO: Mostrar error en pantalla
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  loadFormData(res: any): void {
    this.editCharacterForm.get('name')?.setValue(res['row'].name as never);
    this.editCharacterForm.get('description')?.setValue(res['row'].description);
    // let newThumbnail = res['row'].thumbnail.replace('assets/uploads/', '');
    // this.editCharacterForm.get('thumbnail')?.setValue(newThumbnail);
    this.imageSrc = res['row'].thumbnail;
    const infoArea = document.getElementById('upload-label');
    const fileName = res['row'].thumbnail.split('/').pop();
    if (infoArea !== null) {
      infoArea.textContent = 'Imagen: ' + fileName;
    }
    this.editCharacterForm.markAsPristine();
  }
  fileUpdated: boolean = false;
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      // mostrar la imagen del file en el preview #imageResult
      // this.editCharacterForm.patchValue({
      //   thumbnail: file,
      // });
      this.fileUploaded = file;
      this.fileUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => (this.imageSrc = e.target.result);
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

  onSubmit() {
    this.submitted = true;

    if (this.editCharacterForm.valid) {
      this.editCharacterForm.get('name')?.markAsTouched();

      //Si modifica el archivo, Subir archivo
      if (this.fileUpdated) {
        const thumbnailFile = this.fileUploaded;
        const formData = new FormData();

        if (thumbnailFile?.name !== '') {
          if (thumbnailFile) formData.append('files', thumbnailFile);

          this.sql.subirImagen(formData).subscribe(
            (data: any) => {
              // console.log(data);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      }

      let id = this.router.snapshot.params['id'];
      console.log(this.editCharacterForm.value);
      let obj = {
        name: this.editCharacterForm.get('name')?.value,
        description: this.editCharacterForm.get('description')?.value,
        thumbnail: this.fileUploaded.name,
      };
      this.sql.updateCharacter(obj, id).subscribe(
        (data: any) => {
          const closeBtn = document.getElementById('close-modal');
          closeBtn?.click();
          this._snackBar.open('Personaje actualizado con éxito.', 'Cerrar', {
            duration: 5 * 1000,
            panelClass: 'success-snackbar',
          });
          this.loadCharacter(id);
          // console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
