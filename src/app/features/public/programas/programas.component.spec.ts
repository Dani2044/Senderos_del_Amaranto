import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasComponent } from './programas.component';

describe('ProgramasComponent', () => {
  let component: ProgramasComponent;
  let fixture: ComponentFixture<ProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
