import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KittSpinnerComponent } from './kitt-spinner.component';

describe('KittSpinnerComponent', () => {
  let component: KittSpinnerComponent;
  let fixture: ComponentFixture<KittSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KittSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KittSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
