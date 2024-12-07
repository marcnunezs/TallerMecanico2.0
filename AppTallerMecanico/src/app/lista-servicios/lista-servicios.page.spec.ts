import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaServiciosPage } from './lista-servicios.page';

describe('ListaServiciosPage', () => {
  let component: ListaServiciosPage;
  let fixture: ComponentFixture<ListaServiciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
