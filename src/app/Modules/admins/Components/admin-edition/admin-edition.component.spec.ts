import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditionComponent } from './admin-edition.component';

describe('AdminEditionComponent', () => {
  let component: AdminEditionComponent;
  let fixture: ComponentFixture<AdminEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
