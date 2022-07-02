import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculaDistanciasComponent } from './calcula-distancias.component';

describe('CalculaDistanciasComponent', () => {
  let component: CalculaDistanciasComponent;
  let fixture: ComponentFixture<CalculaDistanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculaDistanciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculaDistanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
