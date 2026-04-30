import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Senderos } from './senderos';

describe('Senderos', () => {
  let component: Senderos;
  let fixture: ComponentFixture<Senderos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Senderos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Senderos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
