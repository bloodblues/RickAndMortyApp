import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPersonajesComponent } from './componentes/lista-personajes/lista-personajes.component';
import { DetallesPersonajeComponent } from './componentes/detalles-personaje/detalles-personaje.component';
import { FormularioPersonajeComponent } from './componentes/formulario-personaje/formulario-personaje.component';

const routes: Routes = [
  { path: 'personajes', component: ListaPersonajesComponent },
  { path: 'character/:id', component: DetallesPersonajeComponent },
  { path: 'edit-character/:id', component: FormularioPersonajeComponent },
  { path: 'create-character', component: FormularioPersonajeComponent },
  { path: '', redirectTo: '/personajes', pathMatch: 'full' },
  { path: '**', redirectTo: '/personajes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
