import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifyGraphComponent } from './statify-graph.component';

describe('StatifyGraphComponent', () => {
  let component: StatifyGraphComponent;
  let fixture: ComponentFixture<StatifyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatifyGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatifyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
