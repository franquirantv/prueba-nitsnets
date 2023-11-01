import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: ActivatedRoute
  ) {}

  character: any;
  comics: any;
  events: any;
  urls: any;
  series: any;
  loading: boolean = true;

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    this.api.getCharacterById(id).subscribe(
      (data: any) => {
        console.log(data.data.results[0]);
        this.character = data.data.results[0];
        this.comics = this.character.comics.items;
        this.events = this.character.events.items;
        this.urls = this.character.urls;
        this.series = this.character.series.items;
        this.loading = false;
      },
      (error: any) => {
        //TODO: Mostrar error en pantalla
        console.log(error);
        this.loading = false;
      }
    );
  }
}
