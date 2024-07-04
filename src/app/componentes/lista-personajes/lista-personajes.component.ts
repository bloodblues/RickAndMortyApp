import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../servicios/rick-and-morty.service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent implements OnInit {
  characters: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'species', 'status', 'actions'];
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1): void {
    this.rickAndMortyService.getCharacters(page).subscribe(response => {
      this.characters = response.results;
      this.totalPages = response.info.pages;
      this.currentPage = page;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }

  viewDetails(id: number): void {
    // Navegar a los detalles del personaje
  }

  editCharacter(id: number): void {
    // Navegar a la edición del personaje
  }

  deleteCharacter(id: number): void {
    // Eliminar el personaje 
  }
}
