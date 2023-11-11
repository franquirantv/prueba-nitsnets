import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent implements OnInit {
  constructor() {}
  @Input() comic: any;
  year: number = 0;
  ngOnInit(): void {
    this.year = new Date(this.comic.dates[1].date).getFullYear();
  }
}
