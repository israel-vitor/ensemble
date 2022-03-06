import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusGruposComponent } from './meus-grupos.component';

describe('MeusGruposComponent', () => {
  let component: MeusGruposComponent;
  let fixture: ComponentFixture<MeusGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
