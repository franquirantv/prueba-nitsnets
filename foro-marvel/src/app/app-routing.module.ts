import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { LocalCharacterListComponent } from './pages/local-character-list/local-character-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    title: 'Inicio',
    path: 'inicio',
    component: CharacterListComponent,
  },
  {
    title: 'Personajes locales',
    path: 'personajes-locales',
    component: LocalCharacterListComponent,
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
