import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiURL = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<any[]>([]);
  private isDataLoaded = false;

  characters$ = this.charactersSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadCharacters(): Observable<any> {
    if (this.isDataLoaded) {
      console.log("ya esta cargada");
      return of(this.charactersSubject.getValue());
    } else {
      console.log("no cargada");
      return this.http.get(`${this.apiURL}`).pipe(
        tap((response: any) => {
          const allCharacters = response.results;
          this.charactersSubject.next(allCharacters);
          this.isDataLoaded = true;
        })
      );
    }
  }

  getCharacterById(id: number): Observable<any> {
    const characters = this.charactersSubject.getValue();
    const character = characters.find(c => c.id === id);
    return of(character);
  }

  createCharacter(character: any): void {
    const characters = this.charactersSubject.getValue();
    character.id = characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1;
    this.charactersSubject.next([...characters, character]);
  }

  updateCharacter(character: any): void {
    const characters = this.charactersSubject.getValue();
    const index = characters.findIndex(c => c.id === character.id);
    if (index !== -1) {
      characters[index] = character;
      this.charactersSubject.next([...characters]);
    }
  }

  deleteCharacter(id: number): void {
    const characters = this.charactersSubject.getValue();
    this.charactersSubject.next(characters.filter(character => character.id !== id));
  }
}
