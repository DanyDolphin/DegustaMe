import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoRecetasComponent } from './seguimiento-recetas.component';

describe('SeguimientoRecetasComponent', () => {
  let component: SeguimientoRecetasComponent;
  let fixture: ComponentFixture<SeguimientoRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoRecetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
