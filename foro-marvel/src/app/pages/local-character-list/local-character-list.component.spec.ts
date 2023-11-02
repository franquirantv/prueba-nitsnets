import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCharacterListComponent } from './local-character-list.component';

describe('LocalCharacterListComponent', () => {
  let component: LocalCharacterListComponent;
  let fixture: ComponentFixture<LocalCharacterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalCharacterListComponent]
    });
    fixture = TestBed.createComponent(LocalCharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
