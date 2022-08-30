import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCreationComponent } from './recipes-creation.component';

describe('RecipesCreationComponent', () => {
  let component: RecipesCreationComponent;
  let fixture: ComponentFixture<RecipesCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
