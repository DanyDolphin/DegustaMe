import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngredienteComponent } from './form-ingrediente.component';

describe('FormIngredienteComponent', () => {
  let component: FormIngredienteComponent;
  let fixture: ComponentFixture<FormIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIngredienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
