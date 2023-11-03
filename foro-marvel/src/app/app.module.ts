import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //esto

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgOptimizedImage } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CharacterComponent } from './components/character/character.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { FooterComponent } from './commons/footer/footer.component';
import { LocalCharacterListComponent } from './pages/local-character-list/local-character-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    PaginationComponent,
    NavbarComponent,
    FooterComponent,
    LocalCharacterListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}