import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  // @Input() characters: string[] = [];
  searchTerm: string = '';

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  onSearch(event: Event): void {
    event.preventDefault();
    this.search.emit(this.searchTerm);
  }
}
