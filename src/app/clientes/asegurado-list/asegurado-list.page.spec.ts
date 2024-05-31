import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AseguradoListPage } from './asegurado-list.page';

describe('AseguradoListPage', () => {
  let component: AseguradoListPage;
  let fixture: ComponentFixture<AseguradoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
