import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  constructor() {}

  @Input() characters: Character[] = [];

  ngOnInit(): void {
    console.log(this.characters);
  }
}
