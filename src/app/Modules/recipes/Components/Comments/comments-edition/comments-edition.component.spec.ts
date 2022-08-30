import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsEditionComponent } from './comments-edition.component';

describe('CommentsEditionComponent', () => {
  let component: CommentsEditionComponent;
  let fixture: ComponentFixture<CommentsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
