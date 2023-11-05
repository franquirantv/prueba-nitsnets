import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const TS = '1';
const APIKEY = '0f46da934e90d1a291101879b792c031';
const HASH = '638db17e901c7f9c5820a0e13a37834b';
const API_URL = `https://gateway.marvel.com:443/v1/public/`;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Esta función devuelve un listado de personajes
   * @param {number} offset - número de personajes a saltar
   * @param {number} limit - número de personajes a mostrar
   * @param {string} nameStartsWith - nombre del personaje a buscar
   * @returns {Observable<any>} - Observable con el listado de personajes
   */
  getCharacter(
    offset: number,
    limit: number,
    nameStartsWith: string
  ): Observable<any> {
    let address =
      API_URL +
      `characters?ts=${TS}&apikey=${APIKEY}&hash=${HASH}&offset=${offset}&limit=${limit}`;
    if (nameStartsWith !== '') {
      address += `&nameStartsWith=${nameStartsWith}`;
    }
    return this.http.get(address);
  }

  /**
   * Esta función devuelve un personaje
   * @param {number} id - id del personaje a mostrar
   * @returns {Observable<any>} - Observable con el personaje
   */
  getCharacterById(id: number): Observable<any> {
    let address =
      API_URL + `characters/${id}?ts=${TS}&apikey=${APIKEY}&hash=${HASH}`;
    return this.http.get(address);
  }
}
