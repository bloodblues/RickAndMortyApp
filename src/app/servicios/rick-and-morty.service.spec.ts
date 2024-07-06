import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import {of} from 'rxjs';

fdescribe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickAndMortyService]
    });

    service = TestBed.inject(RickAndMortyService);
    httpMock = TestBed.inject(HttpTestingController);

    // Interceptar solicitudes a `location`
    const req1 = httpMock.match(`${service['apiURL']}/location`);
    expect(req1.length).toBe(2);
    req1.forEach(req => {
      expect(req.request.method).toBe('GET');
      req.flush({ results: [] });
    });

  });

  it('should load characters', (done) => {

    const dummyCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ];

    service.loadCharacters().subscribe(response => {
      expect(response.results).toEqual(dummyCharacters);
      done();
    });

    const req = httpMock.expectOne(`${service['apiURL']}/character`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyCharacters }); 

    expect(service['charactersSubject'].getValue()).toEqual(dummyCharacters);
  });

  it('should get character by id', () => {
    const dummyCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ];
    service['charactersSubject'].next(dummyCharacters);

    service.getCharacterById(1).subscribe(character => {
      expect(character).toEqual(dummyCharacters[0]);
    });
  });

  //Actualizar personage por id
  it('should update character', () => {
    const dummyCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ];
    service['charactersSubject'].next(dummyCharacters);

    const updatedCharacter = { id: 1, name: 'Rick S.' };
    service.updateCharacter(updatedCharacter).subscribe(() => {
      expect(service['charactersSubject'].getValue()[0]).toEqual(updatedCharacter);
    });
  });

  // Crear personaje
  it('should create character', () => {
    const dummyCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ];
    service['charactersSubject'].next(dummyCharacters);

    const newCharacter = { id: 3, name: 'Summer Smith' };
    service.createCharacter(newCharacter).subscribe(() => {
      expect(service['charactersSubject'].getValue().length).toBe(3);
    });
  });

  // Eliminar personaje
  it('should delete character', () => {
    const dummyCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ];
    service['charactersSubject'].next(dummyCharacters);

    service.deleteCharacter(1);
    expect(service['charactersSubject'].getValue().length).toBe(1);
  });



  afterEach(() => {
    httpMock.verify();
  });
});
