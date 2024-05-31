import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AseguradoEditPage } from './asegurado-edit.page';

describe('AseguradoEditPage', () => {
  let component: AseguradoEditPage;
  let fixture: ComponentFixture<AseguradoEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
