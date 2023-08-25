import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdioalogComponent } from './confirmdioalog.component';

describe('ConfirmdioalogComponent', () => {
  let component: ConfirmdioalogComponent;
  let fixture: ComponentFixture<ConfirmdioalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmdioalogComponent]
    });
    fixture = TestBed.createComponent(ConfirmdioalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
