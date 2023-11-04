import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() characters: string[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  search: string = '';

  onSubmit() {
    this.searchEvent.emit(this.search);
  }
}
