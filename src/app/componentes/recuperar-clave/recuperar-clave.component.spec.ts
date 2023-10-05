import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarClaveComponent } from './recuperar-clave.component';

describe('RecuperarClaveComponent', () => {
  let component: RecuperarClaveComponent;
  let fixture: ComponentFixture<RecuperarClaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarClaveComponent]
    });
    fixture = TestBed.createComponent(RecuperarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
