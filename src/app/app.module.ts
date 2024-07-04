import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPersonajesComponent } from './componentes/lista-personajes/lista-personajes.component';
import { DetallesPersonajeComponent } from './componentes/detalles-personaje/detalles-personaje.component';
import { FormularioPersonajeComponent } from './componentes/formulario-personaje/formulario-personaje.component';
import { SuccessDialogComponent } from './componentes/success-dialog/success-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaPersonajesComponent,
    DetallesPersonajeComponent,
    FormularioPersonajeComponent,
    SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    MatTableModule,  
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
