import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  constructor(private http: HttpClient) {}

  /**
   * Esta función devuelve un listado de personajes
   * @returns {Observable<any>} - Observable con el listado de personajes
   */
  getCharacter(
    offset: number,
    limit: number,
    nameStartsWith: string
  ): Observable<any> {
    let address = API_URL + 'characters';
    if (offset !== null && limit !== null && nameStartsWith !== null) {
      address =
        address +
        `?offset=${offset}&limit=${limit}&nameStartsWith=${nameStartsWith}`;
    }
    return this.http.get(address);
  }

  /**
   * Esta función devuelve un personaje
   * @param {number} id - id del personaje a mostrar
   * @returns {Observable<any>} - Observable con el personaje
   */
  getCharacterById(id: number): Observable<any> {
    let address = API_URL + `characters/${id}`;
    return this.http.get(address);
  }

  /**
   * Esta función añade un personaje
   * @param {any} character - personaje a añadir
   * @returns {Observable<any>} - Observable con el personaje
   */
  addCharacter(character: any): Observable<any> {
    let address = API_URL + 'characters';
    return this.http.post(address, character);
  }

  /**
   * Esta función actualiza un personaje
   * @param {any} character - personaje a actualizar
   * @returns {Observable<any>} - Observable con el personaje
   */
  updateCharacter(character: any, id: number): Observable<any> {
    let address = API_URL + `characters/${id}`;
    return this.http.put(address, character);
  }

  /**
   * Esta función elimina un personaje
   * @param {number} id - id del personaje a eliminar
   * @returns {Observable<any>} - Observable con el personaje
   */
  deleteCharacter(id: number): Observable<any> {
    let address = API_URL + `characters/${id}`;
    return this.http.delete(address);
  }

  /**
   * Esta función sube una imagen
   * @param {FormData} file - imagen a subir
   * @returns {Observable<any>} - Observable con la imagen
   */
  subirImagen(file: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers,
      reportProgress: true,
      observe: 'events' as const,
    };

    let address = API_URL + 'upload';
    return this.http.post(address, file, options);
  }

  /**
   * Esta función obtiene una imagen de la carpeta uploads
   * @param {string} nombre - nombre de la imagen a obtener
   * @returns {Observable<any>} - Observable con la imagen
   */
  obtenerImagen(nombre: string): Observable<any> {
    let address = API_URL + `upload/${nombre}`;
    // console.log(address);
    return this.http.get(address, { responseType: 'blob' });
  }
}
