import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsEditionComponent } from './ingredients-edition.component';

describe('IngredientsEditionComponent', () => {
  let component: IngredientsEditionComponent;
  let fixture: ComponentFixture<IngredientsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
