import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCreationComponent } from './ingredients-creation.component';

describe('IngredientsCreationComponent', () => {
  let component: IngredientsCreationComponent;
  let fixture: ComponentFixture<IngredientsCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
