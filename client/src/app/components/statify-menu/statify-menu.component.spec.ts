import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifyMenuComponent } from './statify-menu.component';

describe('StatifyMenuComponent', () => {
  let component: StatifyMenuComponent;
  let fixture: ComponentFixture<StatifyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatifyMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatifyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
