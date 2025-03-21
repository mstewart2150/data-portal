import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JessDashboardComponent } from './jess-dashboard.component';

describe('JessDashboardComponent', () => {
  let component: JessDashboardComponent;
  let fixture: ComponentFixture<JessDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JessDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JessDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
