import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditionComponent } from './users-edition.component';

describe('UsersEditionComponent', () => {
  let component: UsersEditionComponent;
  let fixture: ComponentFixture<UsersEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
