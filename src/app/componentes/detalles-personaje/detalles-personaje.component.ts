import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickAndMortyService } from '../../servicios/rick-and-morty.service';

@Component({
  selector: 'app-detalles-personaje',
  templateUrl: './detalles-personaje.component.html',
  styleUrls: ['./detalles-personaje.component.css']
})
export class DetallesPersonajeComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rickAndMortyService.getCharacterById(Number(id)).subscribe(character => {
        this.character = character;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/personajes']);
  }
}
