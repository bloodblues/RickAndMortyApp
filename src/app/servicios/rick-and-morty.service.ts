import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiURL = 'https://rickandmortyapi.com/api';
  private charactersSubject = new BehaviorSubject<any[]>([]);
  private originsSubject = new BehaviorSubject<string[]>([]);
  private locationsSubject = new BehaviorSubject<string[]>([]);
  private isDataLoaded = false;

  characters$ = this.charactersSubject.asObservable();
  origins$ = this.originsSubject.asObservable();
  locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadAllOrigins();
    this.loadAllLocations();
  }

  loadCharacters(): Observable<any> {
    if (this.isDataLoaded) {
      return of(this.charactersSubject.getValue());
    } else {
      return this.http.get(`${this.apiURL}/character`).pipe(
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

  createCharacter(character: any): Observable<void> {
    const characters = this.charactersSubject.getValue();
    character.id = characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1;
    this.charactersSubject.next([...characters, character]);
    return of(void 0);
  }

  updateCharacter(character: any): Observable<void> {
    const characters = this.charactersSubject.getValue();
    const index = characters.findIndex(c => c.id === character.id);
    if (index !== -1) {
      characters[index] = character;
      this.charactersSubject.next([...characters]);
    }
    return of(void 0);
  }

  deleteCharacter(id: number): void {
    const characters = this.charactersSubject.getValue();
    this.charactersSubject.next(characters.filter(character => character.id !== id));
  }

  private loadAllOrigins(): void {
    this.http.get<any>(`${this.apiURL}/location`)
      .pipe(
        map(response => response.results.map((location: any) => location.name)),
        catchError(() => of([]))
      )
      .subscribe(origins => this.originsSubject.next(origins));
  }

  private loadAllLocations(): void {
    this.http.get<any>(`${this.apiURL}/location`)
      .pipe(
        map(response => response.results.map((location: any) => location.name)),
        catchError(() => of([]))
      )
      .subscribe(locations => this.locationsSubject.next(locations));
  }

  saveImage(file: File): string {
    const reader = new FileReader();
    const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
    const filePath = `assets/images/${fileName}`;

    reader.onload = () => {
      const result = reader.result as string;
      this.saveImageToAssets(filePath, result);
    };
    reader.readAsDataURL(file);

    return filePath;
  }

  private saveImageToAssets(path: string, data: string): void {
    const blob = new Blob([data], { type: 'image/jpeg' }); // Asumimos jpeg, puede ser modificado
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = path;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
