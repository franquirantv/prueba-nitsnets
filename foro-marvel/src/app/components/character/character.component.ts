import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  constructor() {}

  @Input() character: any = {};

  apiCharacter: boolean = false;

  ngOnInit(): void {
    let path = window.location.pathname;
    this.apiCharacter = !path.includes('personajes-locales') ? true : false;
    console.log(this.character);
  }
}
