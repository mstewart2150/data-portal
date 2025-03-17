import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AubreyDashboardComponent } from './aubrey-dashboard.component';

describe('AubreyDashboardComponent', () => {
  let component: AubreyDashboardComponent;
  let fixture: ComponentFixture<AubreyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AubreyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AubreyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
