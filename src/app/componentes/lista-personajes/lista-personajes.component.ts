import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickAndMortyService } from '../../servicios/rick-and-morty.service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent implements OnInit {
  characters: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'species', 'status', 'actions'];
  currentPageCharacters: any[] = [];
  itemsPerPage: number = 5;
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private rickAndMortyService: RickAndMortyService, private router: Router) { }

  ngOnInit(): void {
    this.rickAndMortyService.characters$.subscribe(characters => {
      this.characters = characters;
      this.totalPages = Math.ceil(this.characters.length / this.itemsPerPage);
      console.log(`characters:${characters.length}| totalPages: ${this.totalPages}`);
      this.loadCurrentPageCharacters();
    });
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.rickAndMortyService.loadCharacters().subscribe();
  }

  loadCurrentPageCharacters(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageCharacters = this.characters.slice(startIndex, endIndex);
    console.log(`currentPageCharacters: ${this.currentPageCharacters.length}`)
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCurrentPageCharacters();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrentPageCharacters();
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/character', id]);
  }

  editCharacter(id: number): void {
    this.router.navigate(['/edit-character', id]);
  }

  deleteCharacter(id: number): void {
    this.rickAndMortyService.deleteCharacter(id);
    this.loadCurrentPageCharacters();
  }
}
