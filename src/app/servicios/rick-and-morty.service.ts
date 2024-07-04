import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiURL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiURL}/character?page=${page}`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/character/${id}`);
  }
}
