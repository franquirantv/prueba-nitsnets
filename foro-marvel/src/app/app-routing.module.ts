import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { AppComponent } from './app.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    title: 'Inicio',
    path: 'inicio',
    component: AppComponent,
  },
  {
    title: 'Lista de personajes',
    path: 'lista',
    component: CharacterListComponent,
  },
  {
    title: 'Detalles de personaje',
    path: 'detalles/:id',
    component: CharacterDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
