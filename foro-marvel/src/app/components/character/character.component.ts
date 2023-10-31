import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  constructor(private api: ApiService) {}

  characters: Character[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    this.api.getCharacter().subscribe((data: any) => {
      this.loading = false;
      this.characters = data.data.results;
      console.log(this.characters);
    });
  }
}
