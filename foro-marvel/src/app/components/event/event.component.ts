import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor() {}
  @Input() evento: any;

  ngOnInit(): void {
    console.log('evento', this.evento);
  }
}
