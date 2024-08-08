import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifyNavComponent } from './statify-nav.component';

describe('StatifyNavComponent', () => {
  let component: StatifyNavComponent;
  let fixture: ComponentFixture<StatifyNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatifyNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatifyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
