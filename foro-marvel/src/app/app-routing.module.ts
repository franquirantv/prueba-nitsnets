import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { LocalCharacterListComponent } from './components/local-character-list/local-character-list.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ExtraComponent } from './pages/extra/extra.component';

const routes: Routes = [
  // Ruta de redirección para rutas no definidas

  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    title: 'Inicio',
    path: 'inicio',
    component: HomeComponent,
  },
  {
    title: 'Personajes locales',
    path: 'personajes-locales',
    component: ExtraComponent,
  },
  {
    title: 'Detalles de personaje',
    path: 'detalles/:id',
    component: CharacterDetailsComponent,
  },
  {
    title: 'Página no encontrada',
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
