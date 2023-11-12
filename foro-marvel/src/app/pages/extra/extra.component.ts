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
          //Resetear datos del formulario
          this.addCharacterForm.reset();
          this.fileUploaded = new File([], ''); // Vaciar el archivo subido en fileUpdated
          this.imageSrc = 'assets/uploads/no-image.png';
          const infoArea = document.getElementById('upload-label');
          if (infoArea !== null) {
            infoArea.textContent = 'Nombre de la imagen';
          }

          //Cerrar el modal
          const closeBtn = document.getElementById('close-modal');
          closeBtn?.click();

          // Mostrar mensaje de éxito
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
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La imagen no puede tener un tamaño mayor a 5MB. Por favor, comprima la imagen o elija una diferente.',
        });
      } else {
        this.showFileName(event);
        this.fileUploaded = file;
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
}
