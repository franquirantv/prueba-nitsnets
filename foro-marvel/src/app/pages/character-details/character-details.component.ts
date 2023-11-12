import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SqliteService } from 'src/app/services/bbdd-local/sqlite.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/store/shared/shared.state';
import { Observable } from 'rxjs';
import { getLoadingDetails } from 'src/app/store/shared/shared.selector';
import { setLoadingSpinnerForDetails } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private routerActivated: ActivatedRoute,
    private router: Router,
    private sql: SqliteService,
    private fb: FormBuilder,
    private store: Store<SharedState>
  ) {}

  character: any;
  comics: any;
  events: any;
  urls: any;
  series: any;
  showLoading$: Observable<boolean> | undefined;
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
    this.showLoading$ = this.store.select(getLoadingDetails);

    let id = this.routerActivated.snapshot.params['id'];
    this.loadCharacter(id);

    // Reiniciamos el scroll al cambiar de página
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Cuando se completa la navegación, reinicia la posición del scroll
        window.scrollTo(0, 0);
      }
    });
  }

  loadCharacter(id: number) {
    this.store.dispatch(setLoadingSpinnerForDetails({ status: true })); // Iniciar carga

    this.isLocalCharacter = id < 1000 ? true : false;

    if (this.isLocalCharacter) {
      this.sql.getCharacterById(id).subscribe(
        (data: any) => {
          // console.log(data);
          this.character = data.row;
          this.character.thumbnail =
            'assets/uploads/' + this.character.thumbnail;
          this.loadFormData(data);
          this.store.dispatch(setLoadingSpinnerForDetails({ status: false })); // Finalizar carga
        },
        (error: any) => {
          console.log(error);
          this.router.navigate(['/404']);
          this.store.dispatch(setLoadingSpinnerForDetails({ status: false })); // Finalizar carga
        }
      );
    } else {
      this.api.getCharacterById(id).subscribe(
        (data: any) => {
          console.log(data.data.results[0]);
          this.character = data.data.results[0];
          // Se obtienen los eventos, comics y series del personaje a partir de la URI
          this.api
            .getEventsByURL(this.character.events.collectionURI)
            .subscribe(
              (data: any) => {
                console.log(data.data.results);
                this.events = data.data.results;
                this.api
                  .getComicsByURL(this.character.comics.collectionURI)
                  .subscribe(
                    (data: any) => {
                      console.log(data.data.results);
                      this.comics = data.data.results;
                      this.api
                        .getSeriesByURL(this.character.series.collectionURI)
                        .subscribe(
                          (data: any) => {
                            console.log(data.data.results);
                            this.series = data.data.results;
                            this.store.dispatch(
                              setLoadingSpinnerForDetails({ status: false })
                            ); // Finalizar carga
                          },
                          (error: any) => {
                            console.log(error);
                          }
                        );
                    },
                    (error: any) => {
                      console.log(error);
                    }
                  );
              },
              (error: any) => {
                console.log(error);
              }
            );
          this.urls = this.character.urls;
        },
        (error: any) => {
          //TODO: Mostrar error en pantalla
          console.log(error);
          this.router.navigate(['/404']);
          this.store.dispatch(setLoadingSpinnerForDetails({ status: false })); // Finalizar carga
        }
      );
    }
  }

  loadFormData(res: any): void {
    this.editCharacterForm.get('name')?.setValue(res['row'].name as never);
    this.editCharacterForm.get('description')?.setValue(res['row'].description);
    let newThumbnail = res['row'].thumbnail.replace('assets/uploads/', '');
    // console.log(newThumbnail);
    this.sql.obtenerImagen(newThumbnail).subscribe(
      (data: any) => {
        data.name = newThumbnail;
        this.fileUploaded = data;
        console.log(this.fileUploaded);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido cargar la imagen. Inténtelo de nuevo más tarde.',
        });
        console.log(error);
      }
    );
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
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La imagen no puede tener un tamaño mayor a 5MB. Por favor, comprima la imagen o elija una diferente.',
        });
      } else {
        this.showFileName(event);
        this.fileUploaded = file;
        this.fileUpdated = true;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => (this.imageSrc = e.target.result);
      }
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
        // console.log(thumbnailFile);
        const formData = new FormData();

        if (thumbnailFile?.name !== '') {
          if (thumbnailFile) formData.append('files', thumbnailFile);

          this.sql.subirImagen(formData).subscribe(
            (data: any) => {
              console.log(data);
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido subir la imagen. Inténtelo de nuevo más tarde.',
              });
              console.log(error);
            }
          );
        }
      }

      let id = this.routerActivated.snapshot.params['id'];
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
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Personaje actualizado con éxito!',
          });
          this.loadCharacter(id);
          this.router.navigate(['/personajes-locales']);

          // console.log(data);
        },
        (error: any) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido actualizar el personaje. Inténtelo de nuevo más tarde.',
          });
        }
      );
    }
  }

  deleteCharacter() {
    let id = this.routerActivated.snapshot.params['id'];
    this.sql.deleteCharacter(id).subscribe(
      (data: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Personaje eliminado con éxito!',
        });
        // this.loadCharacter(id);
        this.router.navigate(['/personajes-locales']);
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido eliminar el personaje. Inténtelo de nuevo más tarde.',
        });
      }
    );
  }
}
