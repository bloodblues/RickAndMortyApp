import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPersonajesComponent } from './componentes/lista-personajes/lista-personajes.component';
import { DetallesPersonajeComponent } from './componentes/detalles-personaje/detalles-personaje.component';
import { FormularioPersonajeComponent } from './componentes/formulario-personaje/formulario-personaje.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPersonajesComponent,
    DetallesPersonajeComponent,
    FormularioPersonajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    MatTableModule,  
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
