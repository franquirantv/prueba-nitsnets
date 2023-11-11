import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SqliteService } from 'src/app/services/bbdd-local/sqlite.service';
import Swal from 'sweetalert2';
import { LocalCharacterListComponent } from '../../components/local-character-list/local-character-list.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent implements OnInit {
  constructor(
    private sql: SqliteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Reiniciamos el scroll al cambiar de página
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Cuando se completa la navegación, reinicia la posición del scroll
        window.scrollTo(0, 0);
      }
    });
  }

  @ViewChild(LocalCharacterListComponent)
  childComponent!: LocalCharacterListComponent;

  public addCharacterForm = this.fb.group({
    name: ['', Validators.required], //se ponene corchetes si vamos a poner varias validaciones
    description: [''],
    // thumbnail: [new File([], '')],
  });

  imageSrc: string | ArrayBuffer | null = '' || 'assets/uploads/no-image.png';
  submitted = false;
  fileUploaded: File = new File([], '');

  onSubmit() {
    this.submitted = true;

    if (this.addCharacterForm.valid) {
      this.addCharacterForm.get('name')?.markAsTouched();

      const thumbnail = this.fileUploaded;
      const formData = new FormData();
      console.log(thumbnail);
      if (thumbnail?.name !== '') {
        if (thumbnail) formData.append('files', thumbnail);

        this.sql.subirImagen(formData).subscribe(
          (data: any) => {
            console.log(data);
          },
          (error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido subir la imagen. Inténtelo de nuevo más tarde.',
            });
          }
        );
      }

      let obj = {
        name: this.addCharacterForm.get('name')?.value,
        description: this.addCharacterForm.get('description')?.value,
        thumbnail: this.fileUploaded.name,
      };
      this.sql.addCharacter(obj).subscribe(
        (data: any) => {
          this.addCharacterForm.reset();
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
            title: 'Personaje añadido con éxito!',
          });
          this.childComponent.getCharacter(); // Recargar la lista de personajes
          // Vaciar el archivo subido en fileUpdated
          this.fileUploaded = new File([], '');
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido añadir el personaje. Inténtelo de nuevo más tarde.',
          });
          console.log(error);
        }
      );
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      // mostrar la imagen del file en el preview #imageResult
      // this.addCharacterForm.patchValue({
      //   thumbnail: file,
      // });
      this.fileUploaded = file;
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
}
