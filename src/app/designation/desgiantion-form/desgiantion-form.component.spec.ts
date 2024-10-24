import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgiantionFormComponent } from './desgiantion-form.component';

describe('DesgiantionFormComponent', () => {
  let component: DesgiantionFormComponent;
  let fixture: ComponentFixture<DesgiantionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesgiantionFormComponent]
    });
    fixture = TestBed.createComponent(DesgiantionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
