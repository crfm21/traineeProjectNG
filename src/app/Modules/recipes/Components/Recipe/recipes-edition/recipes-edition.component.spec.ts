import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesEditionComponent } from './recipes-edition.component';

describe('RecipesEditionComponent', () => {
  let component: RecipesEditionComponent;
  let fixture: ComponentFixture<RecipesEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
