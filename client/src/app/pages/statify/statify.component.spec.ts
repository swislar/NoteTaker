import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifyComponent } from './statify.component';

describe('StatifyComponent', () => {
  let component: StatifyComponent;
  let fixture: ComponentFixture<StatifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
