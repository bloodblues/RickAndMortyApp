import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { RickAndMortyService } from '../../servicios/rick-and-morty.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-formulario-personaje',
  templateUrl: './formulario-personaje.component.html',
  styleUrls: ['./formulario-personaje.component.css']
})
export class FormularioPersonajeComponent implements OnInit {
  characterForm: FormGroup;
  characterId: number | null = null;
  isEditMode = false;
  speciesList: string[] = ['Human', 'Alien', 'Robot', 'Other'];
  statusList: string[] = ['Alive', 'Dead', 'Unknown'];
  genderList: string[] = ['Male', 'Female', 'Genderless', 'Unknown'];
  filteredOriginOptions: Observable<string[]> = of([]);
  filteredLocationOptions: Observable<string[]> = of([]);
  currentImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      origin: ['', Validators.required],
      location: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.characterId = +id;
        this.isEditMode = true;
        this.loadCharacter();
      }
    });

    this.filteredOriginOptions = this.characterForm.controls['origin'].valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterOptions(value, this.rickAndMortyService.origins$))
    );

    this.filteredLocationOptions = this.characterForm.controls['location'].valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterOptions(value, this.rickAndMortyService.locations$))
    );
  }

  loadCharacter(): void {
    if (this.characterId !== null) {
      this.rickAndMortyService.getCharacterById(this.characterId).subscribe(character => {
        this.characterForm.patchValue({
          ...character,
          origin: character.origin.name,
          location: character.location.name,
          image: character.image || 'assets/images/default.jpg'
        });
        this.currentImageUrl = character.image || 'assets/images/default.jpg';
      });
    }
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      const formValue = this.characterForm.value;
      const imageUrl = formValue.image || 'assets/images/default.jpg';
      this.saveCharacter(imageUrl);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private saveCharacter(imageUrl: string): void {
    const formValue = this.characterForm.value;
    const characterData = {
      ...formValue,
      origin: { name: formValue.origin },
      location: { name: formValue.location },
      image: imageUrl
    };

    if (this.isEditMode) {
      this.rickAndMortyService.updateCharacter({
        ...characterData,
        id: this.characterId
      }).subscribe(() => this.showSuccessDialog());
    } else {
      this.rickAndMortyService.createCharacter(characterData).subscribe(() => this.showSuccessDialog());
    }
  }

  showSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/personajes']);
  }

  private _filterOptions(value: string, options$: Observable<string[]>): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return options$.pipe(
      map(options => options.filter(option => option.toLowerCase().includes(filterValue)))
    );
  }

  displayFn(option?: string): string {
    return option ? option : '';
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.characterForm.controls).forEach(field => {
      const control = this.characterForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
