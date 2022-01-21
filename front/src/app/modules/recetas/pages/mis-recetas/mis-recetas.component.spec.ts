import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecetasComponent } from './mis-recetas.component';

describe('SeguimientoRecetasComponent', () => {
  let component: MisRecetasComponent;
  let fixture: ComponentFixture<MisRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRecetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
