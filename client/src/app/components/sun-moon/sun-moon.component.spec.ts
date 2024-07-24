import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunMoonComponent } from './sun-moon.component';

describe('SunMoonComponent', () => {
  let component: SunMoonComponent;
  let fixture: ComponentFixture<SunMoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunMoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunMoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
