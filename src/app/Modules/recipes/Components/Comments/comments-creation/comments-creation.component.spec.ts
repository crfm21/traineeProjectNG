import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCreationComponent } from './comments-creation.component';

describe('CommentsCreationComponent', () => {
  let component: CommentsCreationComponent;
  let fixture: ComponentFixture<CommentsCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
