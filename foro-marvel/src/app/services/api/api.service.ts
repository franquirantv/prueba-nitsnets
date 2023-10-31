import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const TS = '1';
const APIKEY = '0f46da934e90d1a291101879b792c031';
const HASH = '638db17e901c7f9c5820a0e13a37834b';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = `https://gateway.marvel.com:443/v1/public/`;

  constructor(private http: HttpClient) {}

  getCharacter() {
    let address =
      this.url + `characters?ts=${TS}&apikey=${APIKEY}&hash=${HASH}`;
    return this.http.get(address);
  }
}
